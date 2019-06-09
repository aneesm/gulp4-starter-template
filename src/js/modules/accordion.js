/**
 * Accordion
 */

export default function () {
  var accordion = $('.accordion');

  if (accordion.length) {
    $('.toggle').click(function (e) {
      e.preventDefault();

      var $this = $(this);

      if ($this.next().hasClass('active') && $(this).hasClass('active')) {
        $('.toggle').removeClass('active');
        $this.next().removeClass('active');
        $this.next().slideUp(350);
      } else {
        // $('.toggle').removeClass('active');
        $this.parent().parent().find('.accordion__content').removeClass('active');
        // $this.parent().parent().find('.accordion__content').slideUp(350);
        $this.toggleClass('active');
        $this.next().toggleClass('active');
        $this.next().slideToggle(350);
      }
    });
  }
}
