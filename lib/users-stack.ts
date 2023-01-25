import * as cdk from "aws-cdk-lib";
import { Stack, StackProps, aws_iam as iam, RemovalPolicy } from "aws-cdk-lib";
import * as appsync from "aws-cdk-lib/aws-appsync";
import {
  AccountRecovery,
  UserPool,
  UserPoolClient,
  VerificationEmailStyle,
} from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";
import { readFileSync } from "fs";
import { resolve, join } from "path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import {
  AttributeType,
  Table,
  BillingMode,
  TableEncryption,
  CfnGlobalTable,
  ProjectionType,
} from "aws-cdk-lib/aws-dynamodb";
import * as sqs from "aws-cdk-lib/aws-sqs";
import { CfnGraphQLApi } from "aws-cdk-lib/aws-appsync";
import { Runtime } from "aws-cdk-lib/aws-lambda";

const DYNAMODB_DATABASE_NAME: string = "PKDR_FINANCE";

export class UsersStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //Database DynamoDB
    const usersDatabaseDynamoDB: Table = new Table(
      this,
      "usersDatabaseDynamoDB",
      {
        tableName: DYNAMODB_DATABASE_NAME,
        partitionKey: {
          name: "id",
          type: AttributeType.STRING,
        },
        // sortKey: {
        //   name: "cnic",
        //   type: AttributeType.STRING,
        // },
        billingMode: BillingMode.PROVISIONED,
        encryption: TableEncryption.AWS_MANAGED,
        removalPolicy: RemovalPolicy.DESTROY, //will delete table after deletting cloudfomration
      }
    );
    // cnic global secondary Index "cnicIndex" GSI
    usersDatabaseDynamoDB.addGlobalSecondaryIndex({
      indexName: "cnicIndex",
      partitionKey: {
        name: "cnic",
        type: AttributeType.STRING,
      },
      // sortKey: {
      //   name: "sk",
      //   type: AttributeType.STRING,
      // },
      // readCapacity: 1,
      // writeCapacity: 1,
      projectionType: ProjectionType.KEYS_ONLY, //copied all data from table to GSI
    });

    usersDatabaseDynamoDB.addGlobalSecondaryIndex({
      indexName: "userNameIndex",
      partitionKey: {
        name: "USERNAME",
        type: AttributeType.STRING,
      },
      // sortKey: {
      //   name: "sk",
      //   type: AttributeType.STRING,
      // },
      // readCapacity: 1,
      // writeCapacity: 1,
      projectionType: ProjectionType.KEYS_ONLY, //copied all data from table to GSI
    });

    usersDatabaseDynamoDB.addGlobalSecondaryIndex({
      indexName: "getAddressByUserNameIndex",
      partitionKey: {
        name: "USERNAME",
        type: AttributeType.STRING,
      },
      // sortKey: {
      //   name: "sk",
      //   type: AttributeType.STRING,
      // },
      // readCapacity: 1,
      // writeCapacity: 1,
      projectionType: ProjectionType.INCLUDE, //copied all data from table to GSI
      nonKeyAttributes: ["ETH_ADDRESS"],
    });
    // // usersDatabaseDynamoDB.addGlobalSecondaryIndex({
    // //   indexName: "phoneNumberIndex",
    // //   partitionKey: {
    // //     name: "PHONENUMBER",
    // //     type: AttributeType.STRING,
    // //   },
    // //   // sortKey: {
    // //   //   name: "sk",
    // //   //   type: AttributeType.STRING,
    // //   // },
    // //   // readCapacity: 1,
    // //   // writeCapacity: 1,
    // //   projectionType: ProjectionType.KEYS_ONLY, //copied all data from table to GSI
    // // });

    //authLambda
    const authLambda = new NodejsFunction(this, "authLambda", {
      entry: join(
        __dirname,
        "..",
        "lambda",
        "v2",
        "auth_lambda",
        "src",
        "index.ts"
      ),
      handler: "handler",
      runtime: Runtime.NODEJS_16_X,
    });
    //AppSync GraphQL API --additional Authentication Provider
    // const additionalAuthenticationProviderProperty: appsync.CfnGraphQLApi.AdditionalAuthenticationProviderProperty =
    //   {
    //     authenticationType: "AWS_LAMBDA",
    //     lambdaAuthorizerConfig: {
    //       authorizerResultTtlInSeconds: 120,
    //       authorizerUri: authLambda.functionArn,
    //       // identityValidationExpression: 'identityValidationExpression',
    //     },
    //     userPoolConfig: {
    //       appIdClientRegex: "3tihr2r882rhmgvfmkdh56vdqe", //app client ID
    //       awsRegion: "us-west-2",
    //       userPoolId: "us-west-2_cPjOesJgg",
    //     },
    //   };

    //AppSync GraphQL API
    const pkdrFinanceUsersApi = new CfnGraphQLApi(this, "pkdrFinanceUsersApi", {
      name: "pkdrFinanceUsersApi",
      authenticationType: "AWS_LAMBDA",
      lambdaAuthorizerConfig: {
        authorizerResultTtlInSeconds: 0,
        authorizerUri: authLambda.functionArn,
        // identityValidationExpression: 'identityValidationExpression',
      },
    });

    //definition of graphql schema
    const definition = readFileSync(
      resolve(__dirname, "../graphql/schema.graphql")
    ).toString();
    console.log("**************", definition);

    //graphql schema appsync
    const pkdrFinanceUsersApiSchema = new appsync.CfnGraphQLSchema(
      this,
      `pkdrFinanceUsersApiSchema`,
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        definition,
      }
    );

    //Lambda Function Declaration
    //ZK Lambda

    

    //users Lambda
    const usersLambda = new NodejsFunction(this, "usersLambda", {
      entry: join(
        __dirname,
        "..",
        "lambda",
        "v2",
        "users_lambda",
        "src",
        "index.ts"
      ),
      handler: "handler",
      runtime: Runtime.NODEJS_16_X,
      timeout: cdk.Duration.seconds(60),
    });

    const userApiServiceRole: iam.Role = new iam.Role(
      this,
      "userApiServiceRole",
      {
        assumedBy: new iam.ServicePrincipal("appsync.amazonaws.com"),
      }
    );
    userApiServiceRole.addToPolicy(
      new iam.PolicyStatement({
        resources: ["*"],
        actions: ["lambda:InvokeFunction"],
      })
    );

    const usersLambdaDataSource = new appsync.CfnDataSource(
      this,
      "usersLambdaDataSource",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        name: "usersApiResolverDataSourceName",
        type: "AWS_LAMBDA",
        lambdaConfig: {
          lambdaFunctionArn: usersLambda.functionArn,
        },
        serviceRoleArn: userApiServiceRole.roleArn,
      }
    );

    const adminLambdaDataSource = new appsync.CfnDataSource(
      this,
      "adminLambdaDataSource",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        name: "adminApiResolverDataSourceName",
        type: "AWS_LAMBDA",
        lambdaConfig: {
          lambdaFunctionArn: usersLambda.functionArn,
        },
        serviceRoleArn: userApiServiceRole.roleArn,
      }
    );
    
    const resolver_createUser: appsync.CfnResolver = new appsync.CfnResolver(
      this,
      "resolver_createUser",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Mutation",
        fieldName: "createUser",
        dataSourceName: usersLambdaDataSource.name,
      }
    );
    const resolver_zkProfile: appsync.CfnResolver = new appsync.CfnResolver(
      this,
      "resolver_zkProfile",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Mutation",
        fieldName: "zkProfile",
        dataSourceName: usersLambdaDataSource.name,
      }
    );

    const resolver_getUserById: appsync.CfnResolver = new appsync.CfnResolver(
      this,
      "resolver_getUserById",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Query",
        fieldName: "getUserByEmail",
        dataSourceName: usersLambdaDataSource.name,
      }
    );

    const resolver_updateUser: appsync.CfnResolver = new appsync.CfnResolver(
      this,
      "resolver_updateUser",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Mutation",
        fieldName: "updateUser",
        dataSourceName: usersLambdaDataSource.name,
      }
    );

    const resolver_setUserName: appsync.CfnResolver = new appsync.CfnResolver(
      this,
      "resolver_setUserName",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Mutation",
        fieldName: "setUserName",
        dataSourceName: usersLambdaDataSource.name,
      }
    );

    const resolver_addContacts: appsync.CfnResolver = new appsync.CfnResolver(
      this,
      "resolver_addContacts",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Mutation",
        fieldName: "addContacts",
        dataSourceName: usersLambdaDataSource.name,
      }
    );

    const resolver_getAddressByUserName: appsync.CfnResolver =
      new appsync.CfnResolver(this, "resolver_getAddressByUserName", {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Query",
        fieldName: "getAddressByUserName",
        dataSourceName: usersLambdaDataSource.name,
      });

    resolver_getAddressByUserName.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_getAddressByUserName.node.addDependency(usersLambdaDataSource);

    resolver_addContacts.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_addContacts.node.addDependency(usersLambdaDataSource);

    resolver_setUserName.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_setUserName.node.addDependency(usersLambdaDataSource);

    resolver_zkProfile.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_zkProfile.node.addDependency(usersLambdaDataSource);

    resolver_updateUser.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_updateUser.node.addDependency(usersLambdaDataSource);

    resolver_createUser.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_createUser.node.addDependency(usersLambdaDataSource);

    resolver_getUserById.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_getUserById.node.addDependency(usersLambdaDataSource);

    

    const resolver_deleteUser: appsync.CfnResolver = new appsync.CfnResolver(
      this,
      "resolver_deleteUser",
      {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Mutation",
        fieldName: "deleteUser",
        dataSourceName: adminLambdaDataSource.name,
      }
    );
    resolver_deleteUser.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_deleteUser.node.addDependency(adminLambdaDataSource);

    const resolver_getAllUserInfo: appsync.CfnResolver =
      new appsync.CfnResolver(this, "resolver_getAllUserInfo", {
        apiId: pkdrFinanceUsersApi.attrApiId,
        typeName: "Query",
        fieldName: "getAllUserInfo",
        dataSourceName: adminLambdaDataSource.name,
      });
    resolver_getAllUserInfo.node.addDependency(pkdrFinanceUsersApiSchema);
    resolver_getAllUserInfo.node.addDependency(adminLambdaDataSource);

    usersDatabaseDynamoDB.grantReadWriteData(usersLambda);
    usersLambda.addEnvironment(
      "PKDR_FINANCE_USER_TABLE",
      usersDatabaseDynamoDB.tableName
    );
  }
}
