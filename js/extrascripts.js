annotations = {}

$(document).ready(function () {
    addlinkhrefs();
    opening();
    $('a.externallink, a.internallink, a.footnoteexternallink').attr('target', '_blank');
    pagetitle();
    subjectline();
    getAge();
});

function opening() {
    //this is the bit of code that makes the whole opening and closing text thing work.
    $('a[data-o]').click(function (e) {

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

function getAge() {
    var dob = "1982-05-28"
    dob = new Date(dob);
    var today = new Date();
    var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
    $('#age').text(age);
}