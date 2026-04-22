import { Resend } from 'resend'
import { NextResponse } from 'next/server'

// Note: You need to set RESEND_API_KEY in your .env file
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, budget, message } = await req.json()

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is missing')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Replace with your verified domain in Resend
      to: 'info@fabricadewinners.com',
      subject: `Nuevo contacto de ${name} - Fabrica de Winners`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333;">Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Presupuesto:</strong> ${budget}</p>
          <p><strong>Mensaje:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
            ${message}
          </div>
        </div>
      `
    })

    if (error) {
      return NextResponse.json({ error }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
