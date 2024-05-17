function convertDateDDMMYYYY(dateArray) {
  // Assumindo que a data é no formato ["DD", "MM", "YYYY"]
  return `${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`
}

export default function ItsOverEighteen(birthdate) {
  var todayDate = new Date()

  // Converte a data de nascimento para o formato MM/DD/YYYY
  var birth = new Date(convertDateDDMMYYYY(birthdate.split("/")))

  // Retorna a diferença entre hoje e a data de nascimento em anos.
  var year = todayDate.getFullYear() - birth.getFullYear()

  // Retorna a diferença de mês do mês de nascimento para o atual.
  var month = todayDate.getMonth() - birth.getMonth()

  // Caso ainda não tenha ultrapassado o dia e o mês
  if (month < 0 || (month === 0 && todayDate.getDate() < birth.getDate())) {
    year--
  }

  return year >= 18
}
