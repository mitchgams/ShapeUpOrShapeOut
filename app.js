M.AutoInit();
$('document').ready(() => {
    if (window.outerWidth <= 1150) alert('use bigger screen 1150+. k thanks.');
    $('#add-square').click(() => {
        if($('#square-side').val() !== "") new Square($('#square-side').val());
    });
    $('#add-circle').click(() => {
        if($('#square-radius').val() !== "") new Circle($('#circle-radius').val());
    });
    $('#add-isoceles').click(() => {
        if($('#isoceles-height').val() !== "") new Isoceles($('#isoceles-height').val());
    });
    $('#add-rectangle').click(() => {
        if($('#rec-height').val() !== "" && $('#rec-width').val()) new Rectangle($('#rec-height').val(), $('#rec-width').val());
    });
});

class Shape {
    constructor(name, width, height, radius) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.radius = radius;
        this.checkSize();
        this.div = $(`<div class="${this.name}" style="height:${this.height}px; width:${this.width}px; background-color:${this.randColor()} margin-left:${this.randMove()}px; margin-top:${this.randMove()}px;"></div>`);
        this.build();
    }

    build() {
       this.div.appendTo('#shape-board');
        this.div.click(() => this.showData());
        this.div.dblclick(() => this.div.remove()); 
    }

    randColor() {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        return `rgb(${r}, ${g}, ${b}, 0.75);`;
    }

    randMove() {
        let maxMove = 350;
        if(this.width > 500 || this.width > 500 || this.radius > 250)  {
            maxMove = 0;
        } else if(this.width > 250 || this.width > 250 || this.radius > 125) {
            maxMove = 100;
        }
        return Math.floor(Math.random() * maxMove);
    }

    showData() {
        $('#shape-name').empty().append(this.name);
        $('#shape-width').empty().append(this.width);
        $('#shape-height').empty().append(this.height);
        $('#shape-radius').empty().append(this.radius);
        $('#shape-area').empty().append(this.area());
        $('#shape-perimiter').empty().append(this.perimiter());
    }
    checkSize() {
        if(this.width > 600) this.width = 600;
        if(this.height > 600) this.height = 600;
        if(this.radius > 300) this.radius = 300;
    }
}
class Rectangle extends Shape {
    constructor(height, width) {
        super('rectangle', width, height, "");
    }
    area() {
        return this.width * this.height;
    }
    perimiter() {
        return (2 * this.width) + (2 * this.height);
    }
}
class Square extends Shape {
    constructor(width) {
        super('square', width, width, "");
    }
    area() {
        return this.width * this.width;
    }
    perimiter() {
        return 4 * this.width;
    }
}
class Circle extends Shape {
    constructor(radius) {
        super('circle', radius*2, radius*2, radius);
    }
    area() {
        return this.width * this.width;
    }
    perimiter() {
        return 4 * this.width;
    }
}

class Isoceles extends Shape {
    constructor(height) {
        super("isoceles", height, height, "");
    }
    build() {
        /*** Really wanted all my shapes to have borders. but now it cant be transparent :( ***/
        let outer = $(`<div class="isoceles" style="border-right: ${parseInt(this.height)+3}px solid transparent; border-bottom: ${parseInt(this.height)+3}px solid black; margin-left:${this.randMove()}px; margin-top:${this.randMove()}px;"></div>`);
        this.div = $(`<div class="isoceles-outer" style="border-right: ${this.height}px solid transparent; border-bottom: ${this.height}px solid ${this.randColor()}"></div>`);
        outer.appendTo('#shape-board').append(this.div);
        this.div.click(() => this.showData());
        this.div.dblclick(() => {
            this.div.remove();
            outer.remove();
        });
    }
    area() {
        return (this.height*this.height)/2;
    }
    perimiter() {
        return Math.floor((2*this.height)+(Math.sqrt(2)*this.height));
    }
}