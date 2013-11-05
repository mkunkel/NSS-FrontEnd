$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('.song').on('click', clickSongRow);
  $('audio').on('play', clickPlay);
}

function clickSongRow() {
  if (!$(this).hasClass('only')) {
    if ($(this).next().hasClass('collapse')) {
      $('.play').addClass('collapse');
      $(this).next().removeClass('collapse');
    } else {
      $(this).next().addClass('collapse');
    }
  }
}

function clickPlay() {
  // Check state, only if not paused, pause

  // $('audio').trigger('pause');
  // if(this.paused) {this.play();};
}