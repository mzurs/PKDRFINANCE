export default function handler(req:any, res:any) {
  if (req.method === 'POST') {
    console.log(req.body);
    res.status(200).json({ status: 'Success' });
  } else {
    // Handle any other HTTP method
  }
}