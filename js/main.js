var waypoints = $('.part').waypoint(function (direction) {
  //console.log(this.element.innerHTML);
  console.log($(this.element));
  $(this.element).children().addClass('active');
}, {
  offset: '100%'
});