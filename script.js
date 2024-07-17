let sim = ['*', '/', '-', '+', '.']
let input = ''
let $input = document.querySelector('.input')

$input.onkeyup = function (e) {
  if (e.key == 'Enter') ev('=')
}

$input.oninput = function (e) {
  ev(e.inputType == 'deleteContentBackward' ? 'Del' : e.data)
  return false
}
;[...document.querySelectorAll('button')].forEach(function (el) {
  el.onclick = ev
})

function ev(data) {
  let value = typeof data == 'string' ? data : this.textContent

  if (value == 'C') {
    if (!input && $input.value) input = $input.value

    if (input) return ($input.value = input = '')

    return false
  }

  if (value == 'Del') {
    input = $input.value = input.slice(0, -1)
    return false
  }

  if (sim.includes(input[input.length - 1]) && sim.includes(value)) {
    if (value != '-' && sim.includes(input[input.length - 1]))
      input = input.slice(0, -1)
    if (
      (value == '-' && input[input.length - 1] == '-') ||
      (value == '-' && input[input.length - 1] == '+')
    )
      input = input.slice(0, -1)
    if (value != '-' && sim.includes(input[input.length - 1]))
      input = input.slice(0, -1)
  }

  if (value == '=') {
    if (input != $input.value) input = $input.value

    input = sim.includes(input[input.length - 1]) ? input.slice(0, -1) : input
    input = sim.includes(input[input.length - 1]) ? input.slice(0, -1) : input

    let result = strToMath(input)

    input = $input.value = result

    return false
  }

  if (input == '' && sim.includes(value) && value != '-') {
    value = ''
  }

  input += value
  $input.value = input
}

function strToMath(string) {
  string = string
    .replaceAll(' ', '')
    .replaceAll('+', ' + ')
    .replaceAll('*', ' * ')
    .replaceAll('-', ' - ')
    .replaceAll('/', ' / ')
    .split(' ')

  for (let i = 0; i < string.length; i++) {
    if (string[i] == '') {
      string.splice(i, 2)
      string[i] = '-' + string[i]
    }
  }

  let calc = document.createElement('calc')
  calc.style['opacity'] = `calc(${string.join(' ')})`
  let result = parseFloat(
    calc.style['opacity'].replace('calc(', '').replace(')', '')
  )
  calc.remove()

  return result
}
