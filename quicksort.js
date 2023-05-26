$(document).ready(async function () {
  const arr = [1, 8, 3, 9, 20, 4, -1, 5, 15, 7];

  let numbers = document.getElementById('numbers')

  for (let i of arr) {
    let numberDiv = document.createElement('div');
    numberDiv.className = 'number'
    numberDiv.innerHTML += i
    numbers.appendChild(numberDiv)
  }

  function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  function waitForButtonClick() {
    return new Promise((resolve, reject) => {
      $('#nextStep').on('click', function (e) {
        /// do something to process the answer
        resolve("clicked");
      });
    });
  }
  // $('#nextStep').on('click', function () {
  //   console.log("clicked")
  // })

  // const delay = () => new Promise(res => setTimeout(res, 1000));
  const delay = () => waitForButtonClick();

  async function quicksort(arr, low, high) {
    $('.number').eq(high).removeClass('number-pivot')


    if (low >= high) {
      return;
    } else {
      $('#explanation').append('We choose a new pivot element - the most right element of the current sub array');
      await delay();
      $('#explanation').empty();
    }

    //chose pivot (in this case the last element of the array)
    let pivot = arr[high];


    $('.number').eq(high).addClass('number-pivot')
    await delay();

    let leftPointer = low;
    let rightPointer = high;

    while (leftPointer < rightPointer) {
      $('.number').eq(leftPointer).addClass('number-left-pointer')
      $('.number').eq(rightPointer).addClass('number-right-pointer')
      await delay();
      while (arr[leftPointer] <= pivot && leftPointer < rightPointer) {
        leftPointer++;
        $('.number').eq(leftPointer - 1).removeClass('number-left-pointer')
        $('.number').eq(leftPointer).addClass('number-left-pointer')
        await delay();
      }

      while (arr[rightPointer] >= pivot && leftPointer < rightPointer) {
        rightPointer--;
        $('.number').eq(rightPointer + 1).removeClass('number-right-pointer')
        $('.number').eq(rightPointer).addClass('number-right-pointer')
        await delay();
      }

      $('#explanation').append('Now we swap the elements on position ' + leftPointer + ' and ' + rightPointer);
      await delay();

      swap(arr, leftPointer, rightPointer);
      swaps($('.number-left-pointer'), $('.number-right-pointer'))
      $('#explanation').empty()
    }

    $('.number').eq(leftPointer).removeClass('number-left-pointer')
    $('.number').eq(rightPointer).removeClass('number-right-pointer')

    $('.number').eq(leftPointer).addClass('number-pivot-change')


    $('#explanation').append('Now we swap our pivot element with the current element');
    await delay();
    swap(arr, leftPointer, high);
    swapsPivot($('.number-pivot-change'), $('.number-pivot'))

    $('#explanation').empty();

    await quicksort(arr, low, leftPointer - 1);
    await quicksort(arr, leftPointer + 1, high);

  }

  console.log("before:");
  console.log(arr);
  quicksort(arr, 0, arr.length - 1);

  console.log("after: ");
  console.log(arr);


  function swaps(a, b) {
    div1 = a;
    div2 = b;

    tdiv1 = div1.clone();
    tdiv2 = div2.clone();

    if (!div2.is(':empty')) {
      div1.replaceWith(tdiv2);
      div2.replaceWith(tdiv1);

      tdiv1.removeClass("number-left-pointer");
      tdiv2.removeClass("number-right-pointer");
    }

  };
  function swapsPivot(a, b) {
    div1 = a;
    div2 = b;

    tdiv1 = div1.clone();
    tdiv2 = div2.clone();

    if (!div2.is(':empty')) {
      div1.replaceWith(tdiv2);
      div2.replaceWith(tdiv1);

      tdiv1.removeClass("number-pivot-change");
      tdiv2.removeClass("number-pivot-change");
      tdiv2.removeClass("number-pivot");
    }

  }
}
);