export default class smoothScroll {
  // adapted from https://codepen.io/brian-baum/pen/mJZxJX
  constructor() {
    this.timer = null;
  }

  static stop() {
    clearTimeout(this.timer);
  }

  static scrollTo(id, callback) {
    var settings = {
      duration: 500,
      easing: {
        outQuint: function (x, t, b, c, d) {
          return c*((t=t/d-1)*t*t*t*t + 1) + b;
        }
      }
    };
    var percentage;
    var startTime;
    var node = document.getElementById(id);
    var offset = window.pageYOffset;
    var targetY = node.getBoundingClientRect().top;
    // see http://stackoverflow.com/questions/487073/check-if-element-is-visible-after-scrolling

    startTime = Date.now();
    percentage = 0;

    if (this.timer) {
      clearInterval(this.timer);
    }

    function step () {
      var yScroll;
      var elapsed = Date.now() - startTime;

      if (elapsed > settings.duration) {
        clearTimeout(this.timer);
      }

      percentage = elapsed / settings.duration;

      if (percentage > 1) {
        clearTimeout(this.timer);

        if (callback) {
          callback();
        }
      } else {
        yScroll = settings.easing.outQuint(0, elapsed, offset, targetY, settings.duration);
        window.scrollTo(0, yScroll);
        this.timer = setTimeout(step, 10);
      }
    }

    this.timer = setTimeout(step, 10);
  }
}
