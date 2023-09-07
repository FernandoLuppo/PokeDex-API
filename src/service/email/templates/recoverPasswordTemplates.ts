export const recoverPasswordTemplate = (
  sender: string,
  recipient: string,
  code: number[]
): {
  from: string
  to: string
  subject: string
  html: string
} => {
  const template = {
    from: sender,
    to: recipient,
    subject: "LuppoTW - Recuperar senha!",
    html: `
        <h3 style="color: #000;">Precisa restaurar sua senha?</h3>
        <p style="color: #000;">
            Segue abaixo seu <strong>código de verificação</strong> Agora retorne ao nosso
            site e preencha o campo requirido para conseguir mudar sua senha.
        </p>
        <p><strong>${code[0]}${code[1]}${code[2]}${code[3]}${code[4]}${code[5]}</strong></p>
        <br />
        <p style="color: #000;">Caso você não tenha solicitado uma troca de senha, por favor desconsidere esse email</p>
    `
  }

  return template
}
