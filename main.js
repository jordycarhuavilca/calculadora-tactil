const calcu__body = document.querySelector('.calcu__body')
const topResultado = document.querySelector('.copying')
const bottonResultado = document.querySelector('.answer')
const fatter = document.querySelector('.calcu__header')
function getTopResultado() {
  return topResultado.textContent.trim()
}
function length() {
  return topResultado.textContent.length
}
function _delete(value) {
  value = value.substring(0, value.length - 1)
  return value
}
function isThereSignAtBegginning(value) {
  if (value[0] === '-') {
    return true
  } else {
    return false
  }
}
function resolver(sign, a, b) {
  let resultado = 0
  switch (sign) {
    case '+':
      resultado = Number(a) + Number(b)
      break
    case '-':
      resultado = Number(a) - Number(b)
      break
    case '÷':
      resultado = Number(a) / Number(b)
      break
    case '×':
      resultado = Number(a) * Number(b)
      break
  }
  return resultado
}
function verication(e) {
  let className = e.target.className
  let value = e.target.textContent
  trueFalse = false
  if (
    className != 'row-1' &&
    className != 'row-2' &&
    className != 'row-18' &&
    className != 'calcu__body'
  ) {
    trueFalse = true
  }
  if (
    (value === '+' || value === '÷' || value === '×') &&
    getTopResultado()[length() - 1] === '0'
  ) {
    trueFalse = false
  }

  return trueFalse
}
function isRepeatingTheSameSign(e) {
  let lastValue = getTopResultado()[length() - 1]
  let currentDataId = e.target.getAttribute('data-id')
  let LastDataId = '-1'
  let ff = true
  if (lastValue === '+' || lastValue === '×' || lastValue === '÷' || lastValue === '-') {
    LastDataId = e.target.getAttribute('data-id')
  }
  if (lastValue !== '-' && e.target.textContent === '-') {
    LastDataId = '-1'
  }
  if (LastDataId === null) {
    LastDataId = '-1'
  }

  if (JSON.stringify(currentDataId) === JSON.stringify(LastDataId)) {
    ff = true
    // console.log(ff)
    return true
  } else {
    ff = false
    // console.log(ff)
    return false
  }
}
function changeFirstDefaultCero(value) {
  let trueFalse = getTopResultado()[0] === '0' && getTopResultado()[1] !== '.' ? true : false
  if (value === '.') {
    trueFalse = false
  }
  if (trueFalse) {
    topResultado.textContent = ''
  }
}
function restore(value) {
  switch (value) {
    case 'c':
      topResultado.textContent = '0'
      fatter.classList.remove('d-block')
      break
    case 'delete':
      let sign
      let count
      if (getTopResultado().length === 1 && getTopResultado()[0] !== 0) {
        topResultado.textContent = '0'
      } else {
        topResultado.textContent = _delete(getTopResultado())
      }
      if (getTopResultado()[0] === '-') {
        sign = getTopResultado()[findIndex(value, 2)]
        count = 2
      } else {
        sign = getTopResultado()[findIndex(value, 1)]
        count = 1
      }
      setBottonAnswer(getTopResultado(), count, sign)
      break

    case '=':
      break
  }
}
function countSigns(value, count) {
  let incre = 0
  let length = value.length
  let numero = -1
  for (let i = 0; i < length; i++) {
    if (value[i] === '+' || value[i] === '÷' || value[i] === '×' || value[i] === '-') {
      // console.log('value ' + i+' ' +value[i])
      // el incremento sera menor a lo previsto porque  comienza en -1
      incre++
      // console.log('incre ' + incre)
    }
    if (incre >= count) {
      // por eso se incrementa uno mas para lo previsto
      numero = incre
      console.log('break')
      break
    }
  }
  // console.log('------------')
  return numero
}
function setValue(e) {
  let value = e.target.textContent.trim()

  if (verication(e) && !isRepeatingTheSameSign(e)) {
    changeFirstDefaultCero(value)
    topResultado.textContent += value
  }
}
function findIndex(value, countSignos) {
  let index = -1
  let incre = 0
  for (let i = 0; i < value.length; i++) {
    if (value[i] === '+' || value[i] === '÷' || value[i] === '×' || value[i] === '-') {
      incre++
    }
    if (incre >= countSignos) {
      index = i
      break
    }
  }
  return index
}
function getValueA(value, count) {
  let index = findIndex(value, count)
  let a = value.substring(0, index)
  return a
}
function getValueB(value, count, length) {
  let index = findIndex(value, count)
  // para suma menos por menos
  if (getTopResultado()[index] !== '-' || getTopResultado()[0] !== '-') {
    index++
  }
  let b = value.substring(index, length)
  return b
}
function divBottonAnswer(value) {
  let count = -1
  if (getTopResultado()[0] === '-') {
    count = countSigns(value, 2)
  } else {
    count = countSigns(value, 1)
  }
  if (count > 0) {
    fatter.classList.add('d-block')
  } else {
    fatter.classList.remove('d-block')
  }
}
function setBottonAnswer(value, count, sign) {
  console.log('a ' +  getValueA(value, count))
  console.log('b ' +   getValueB(value, count, length()))

  let newValue = resolver(sign, getValueA(value, count), getValueB(value, count, length()))
  if (JSON.stringify(newValue) !== 'null') {
    divBottonAnswer(getTopResultado())
    bottonResultado.textContent = newValue
  } else {
    bottonResultado.textContent = '0'
  }
}
function setTopAnswer(value, sign) {
  topResultado.textContent = value + sign
}

function developNegative(numeroSignosA, numeroSignosB) {
  let value = getTopResultado()
  let secondSign = getTopResultado()[findIndex(value, numeroSignosB)]
  let thirdSign = getTopResultado()[findIndex(value, numeroSignosB) + 1]
  // en caso de que un numero negativo opere con otro negativo .
  if (secondSign !== '-' && thirdSign === '-') {
    numeroSignosA = numeroSignosB <= 1 ? 3 : 4
  }
  let count = countSigns(value, numeroSignosA)
  let sign = getTopResultado()[findIndex(value, numeroSignosB)]
  // los dos numeros negativos se puedan sumar
  if (getTopResultado()[0] === '-' && sign === '-') {
    sign = '+'
  }
  setBottonAnswer(value, numeroSignosB, sign)
  if (count >= numeroSignosA) {
    value = resolver(
      sign,
      getValueA(value, numeroSignosB),
      getValueB(value, numeroSignosB, length() - 1)
    )
    setTopAnswer(value, getTopResultado()[getTopResultado().length - 1])
  }
}
function develop() {
  let trueFalse = isThereSignAtBegginning(getTopResultado())
  let numeroSignosA
  let numeroSignosB
  if (trueFalse) {
    numeroSignosA = 3
    numeroSignosB = 2
    developNegative(numeroSignosA, numeroSignosB)
  } else {
    numeroSignosA = 2
    numeroSignosB = 1
    developNegative(numeroSignosA, numeroSignosB)
  }
}
function signoEqual(){
  topResultado.textContent = '0'
  let trueFalse = bottonResultado.textContent.length > 0 
  if (trueFalse) {
    fatter.classList.add('resultado')
  }
}
function firstOperation(e) {
  let value = e.target.textContent.trim()
  let className = e.target.className
  if (className === 'row-1' || className === 'row-2'  ) {
    restore(value)
  } else {
    fatter.classList.remove('resultado')
    setValue(e)
    develop(e)
  }
  if(className === 'row-18'){
    signoEqual()
  }
 
}
calcu__body.addEventListener('click', firstOperation)
