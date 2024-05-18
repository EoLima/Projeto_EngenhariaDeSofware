import { parse, differenceInYears, isBefore, subYears } from "date-fns"

export default function ItsOverEighteen(birthdate) {
  // Converte a data de nascimento para o formato Date usando date-fns
  const birthDate = parse(birthdate, "dd/MM/yyyy", new Date())
  const todayDate = new Date()

  // Calcula a diferença em anos entre hoje e a data de nascimento
  const age = differenceInYears(todayDate, birthDate)

  // Verifica se a pessoa tem pelo menos 18 anos
  return (
    age > 18 || (age === 18 && !isBefore(todayDate, subYears(todayDate, 18)))
  )
}
