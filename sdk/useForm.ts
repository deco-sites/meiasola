function validName(text: string) {
  return Boolean(text.match(/^([A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]+)?$/));
}

function validEmail(text: string) {
  return Boolean(
    text.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  );
}

function validBirthDate(date: string): boolean {
  // Verifica se a data tem o formato DD/MM/AAAA
  if (date.length !== 10 || date[2] !== "/" || date[5] !== "/") {
    return false;
  }

  // Extrai dia, mês e ano da string
  const day = parseInt(date.slice(0, 2), 10);
  const month = parseInt(date.slice(3, 5), 10);
  const year = parseInt(date.slice(6, 10), 10);

  // Verifica se o ano está dentro de uma faixa razoável
  const currentYear = new Date().getFullYear();
  if (year < 1900 || year > currentYear) {
    return false;
  }

  // Verifica se o mês é válido
  if (month < 1 || month > 12) {
    return false;
  }

  // Verifica se o dia é válido para o mês e ano
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) {
    return false;
  }

  return true;
}

function validPhone(text: string) {
  let telefone = text.replace(/\D/g, "");

  if (!(telefone.length >= 10 && telefone.length <= 11)) return false;

  if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9)
    return false;

  for (var n = 0; n < 10; n++) {
    if (
      telefone == new Array(11).join(`${n}`) ||
      telefone == new Array(12).join(`${n}`)
    )
      return false;
  }

  var codigosDDD = [
    11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35,
    37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 64, 63,
    65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88,
    89, 91, 92, 93, 94, 95, 96, 97, 98, 99,
  ];

  if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) == -1)
    return false;

  if (new Date().getFullYear() < 2017) return true;
  if (
    telefone.length == 10 &&
    [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3))) == -1
  )
    return false;

  return true;
}

const state = {
  validName,
  validEmail,
  validPhone,
  validBirthDate,
};

export const useForm = () => state;
