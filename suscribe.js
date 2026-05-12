export default async function handler(req, res) {
  const { email } = req.body

  const response = await fetch('https://api.mailersend.com/v1/email', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer mlsn.bad747fbaaa140e3573a30f0773d9f93ccc9de74d3c3a0f63c7680318aed4de7',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: {
        email: 'noreply@test-zxk54v85qm6ljy6v.mlsender.net',
        name: 'Supermercado Máximo'
      },
      to: [{ email }],
      template_id: '3zxk54v0edpgjy6v'
    })
  })

  const data = await response.json()
  res.status(response.status).json(data)
}