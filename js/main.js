let heroes = [ "Городничий", "Аммос Федорович", "Артемий Филиппович", "Лука Лукич"];

let select = document.getElementById("role");
let btn = document.getElementById("btn");
let out = document.getElementById("text");
let result = [];
let final = {};
let text = `
    Городничий: Я пригласил вас, господа, с тем, чтобы сообщить вам пренеприятное известие: к нам едет ревизор.
    Аммос Федорович: Как ревизор?
    Артемий Филиппович: Как ревизор?
    Городничий: Ревизор из Петербурга, инкогнито. И еще с секретным предписаньем.
    Аммос Федорович: Вот те на!
    Артемий Филиппович: Вот не было заботы, так подай!
    Лука Лукич: Господи боже! еще и с секретным предписаньем!
`;

function createOption( arr ) {
    let all = select.appendChild(document.createElement("option"));
    all.value = "all";
    all.innerHTML = "Все";
    for (let hero of arr) {
        let item = select.appendChild(document.createElement("option"));
        item.value = hero;
        item.innerHTML = hero
    }
}

let arr = text.split("\n");
arr.forEach( (item, index) => {
    if (item === "") {
        arr.splice( index,1)
    }
} );

for (let item of arr) {
    let res = item.replace(/\s+/g, ' ').trim();
    result.push(res)
}

window.onload = function () {
    createOption(heroes);
};

btn.onclick = function () {
    heroes.forEach( person => {
        let obj = {};
        obj[person] = [];
        result.forEach( (item, index) => {
            if( item.indexOf( `${person + ": "}` ) === 0  ) {
                obj[person].push( `${++index + ") "}` + item.split( `${person + ": "}` )[1] )
            }
            Object.assign(final, obj)
        } );
        if (select.value === `${person}`) {
            out.innerText = "";
            out.innerText = `\n${person}` + ":\n" + `  ${obj[person].join("\n")}` ;
        }

    } );
    if(select.value === "all") {
        out.innerText = "";
        for (let key in final) {
            out.innerText += `\n${key}` + ":\n" + `${final[key].join("\n")}`
        }
    }
};

