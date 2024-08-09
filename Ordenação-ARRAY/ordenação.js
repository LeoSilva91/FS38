// Array 
const numbers = [3, 7, 45, 5, 2, 98, 47, 33, 78, 1, 32, 14, 27, 64, 55, 85];


// 'n' é a quantidade total de elementos no array 'numbers'
// 'n' Quantidade de loop.
let n = numbers.length;

// loop controla quantas vezes percorremos todo o array

for (let i = 0; i < n; i++) {
  // i= 0 true
  // i=1 true
  
//comparando pares de elementos adjacentes
  
  for (let j = 0; j < n - 1; j++) {
    // j=0 3 > 7  - n troca
    // j=1 7 > 45 - n troca
    // j=2 45 > 5 - troca
    // Verifica se o elemento atual (numbers[j]) é maior que o próximo (numbers[j + 1])
    // Se for, significa que eles estão na ordem errada e precisam ser trocados de lugar
    if (numbers[j] > numbers[j + 1]) {
      
      
      // armazena o valor do elemento atual (numbers[j]) em uma variável temporária 'temp'
      let temp = numbers[j];
      
      // Depois, colocamos o valor do próximo elemento (numbers[j + 1]) na posição atual (numbers[j])
      numbers[j] = numbers[j + 1];
      
      // Finalmente, colocamos o valor armazenado em 'temp' na posição seguinte (numbers[j + 1])
      numbers[j + 1] = temp;
      
      // Como resultado, o maior dos dois elementos foi movido para a posição mais à direita
    }
  }
  // Ao final de cada passagem do loop interno, o maior elemento da parte não ordenada do array estará na sua posição correta
  // O loop externo continua até que todos os elementos estejam ordenados
}

// Exibe o array ordenado no console
console.log(numbers);
