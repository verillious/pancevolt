annotations = {}

$(document).ready(function () {
    addlinkhrefs();
    opening();
    $('a.externallink, a.internallink, a.footnoteexternallink').attr('target', '_blank');
    var canvas = document.getElementById("canv");
    var canvas = document.querySelector('canvas');
    fitToContainer(canvas);
    // fitToContainer(canvas);
    // canvas.width = document.body.clientWidth; //document.width is obsolete
    // canvas.height = window.innerHeight; //document.height is obsolete
});



function fitToContainer(canvas){
  // Make it visually fill the positioned parent
  canvas.style.width ='100%';
  canvas.style.height='100%';
  // ...then set the internal size to match
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

function opening() {
    //this is the bit of code that makes the whole opening and closing text thing work.
    $('a[data-o]').click(function (e) {
        var num = 4;
        var radius = 10;
        var canvas = document.getElementById("canv");
        var max = canvas.width;

        createRandomNodes(num, radius, max);
        // fitToContainer(canvas);
        //this line just stops it visiting the href which is always #
        e.preventDefault();
        window.dispatchEvent(new Event('resize'));
        $(window).trigger("resize")

        var openedby = $(this).attr('data-o');

        try {
            annotations[$(this)[0].outerHTML].hide()
            annotations[$(this)[0].outerHTML].remove()
            delete annotations[$(this)[0].outerHTML]
        } catch (err) {
            console.log(err)
        }

        $('[data-ob="' + openedby + '"]').removeClass('off').addClass('on');
        var closedby = $(this).attr('data-c');
        $('[data-cb="' + closedby + '"]').remove();

        $(this).contents().unwrap();

        var allAs = $('[data-ob="' + openedby + '"]').children("a");

        $.each(allAs, function (index, item) {
            width = Math.random() * (2.3 - 2) + 2;
            duration = Math.floor(Math.random() * 350) + 300
            iterations = Math.floor(Math.random() * 2) + 1
            annotation = RoughNotation.annotate(item, {
                type: 'underline',
                color: '#111',
                padding: 0,
                multiline: true,
                animationDuration: duration,
                iterations: iterations,
                strokeWidth: width
            })
            annotations[item.outerHTML] = annotation
            annotation.show()
        });
    });
}

function addlinkhrefs() {
    //this is so I didn't have to code them in, but so you can still tab around the opening links if you want. I'm not actually sure if I want people to be able to tab through them, but i suppose it's useful while I work?
    $('a').not(".internallink").not(".externallink").not(".footnoteexternallink").attr("href", "#");

}

function createRandomNodes(num, radius, max) {
    var canvas = document.getElementById("canv");
    const rc = rough.canvas(canvas);
    // var context = canvas.getContext("2d");
    // context.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i <= num; i++) {
        // context.beginPath();
        var rand_x = Math.random(i) * max;
        var rand_y = Math.random(i) * max;
        var rand_r = Math.random(i) * 10;
        // context.arc(rand_x, rand_y, radius, 0, 2 * Math.PI);
        rc.circle(rand_x, rand_y, rand_r, {
            fill: '#11111',
            fillStyle: 'solid', // solid fill
            roughness: 0.5,
            disableMultiStroke: true,
            simplification: 1
        });
        // context.fill();
        // context.closePath();
    }
}

function fitToContainer(canvas){
  // Make it visually fill the positioned parent
  canvas.style.width ='100%';
  canvas.style.height='100%';
  // ...then set the internal size to match
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}