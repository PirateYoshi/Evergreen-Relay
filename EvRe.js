function constructDOM(vDOM,ctx){
    console.log("Entering vDOM...");
    var fDOM = domTreeRecurse(vDOM);
    console.log("Leaving vDOM...");
    console.log(fDOM);
    console.log("Appending DOMNode in ctx...");
    ctx.appendChild(fDOM);
    console.log("Success!");
}

function domTreeRecurse(vDOM,ctx){
    var el,
        vEl;
    try{
        // try to assign a new DocumentFragment to ctx
        throw "error";
        if(typeof ctx !== 'object') ctx = new DocumentFragment();
    }catch(err) {
        // if an error is thrown, assign document to ctx
        if(typeof ctx !== 'object'){
            ctx = document.createDocumentFragment();
            ctx = ctx.createElement("div");
            ctx.setAttribute("style","display:none!important;");
            ctx.setAttribute("id","fragDOM-offline");
        }

    }finally{
        console.log("\n====================\nEntering new context...\n====================\n");
        console.log(vDOM);
        // for each item in array
        vDOM.forEach(function(item){
            // if item.contructor !== Object
            console.log("\nNew item...")
            console.log("Is item an Object?");
            if(item.constructor !== Object){
                console.log("Item is NOT an Object...");
                // ctx.createTextNode(item.toString())
                console.log("Creating el as TextNode...");
                el = document.createTextNode(item.toString());
                console.log("Success!");
                console.log("Appending TextNode inside of ctx...");
                ctx.appendChild(el);
                console.log("Success!");
            // else
            }else if(item.constructor === Object){
                console.log("Item IS an Object...");
                // var vEl = item[Object.keys(item)[0]]
                console.log("creating vEl variable...");
                vEl = item[Object.keys(item)[0]];
                console.log("Success!");
                // var el = item property name
                console.log("Creating el as DOMNode...");
                el = document.createElement(Object.getOwnPropertyNames(item)[0]);
                console.log("Success!");
                // for( var key in vEl )
                console.log("entering for-loop...");
                for(var key in vEl){
                    if(key !== "_Content"){
                        console.log(key + " is not \"_Content\"")
                        console.log("Setting attribute...")
                        el.setAttribute(key,vEl[key]);
                        console.log("Success!");
                    }
                }
                console.log("Leaving for-loop...");
                console.log("Appending DOMNode in ctx...");
                ctx.appendChild(el);
                console.log("Success!");
                if(!!vEl._Content) {
                    domTreeRecurse(vEl[key],el);
                    console.log("Leaving ctx...");
                }
            }
        });
        return ctx;
    }
}

var vDOM = [
    {
        div: {
            id: "myId",
            class: "myClass",
            style: "display:initial;",
            _Content:[
                "hello",
                {
                    em: {
                        _Content: [
                            " darkness ",
                            []
                        ]
                    }
                },
                {
                    img: {
                        src: "http://apps.startribune.com/blogs/user_images/edinajo_1351532082_woods.jpg",
                        style: "height:20px;width:auto;"
                    }
                },
                "my old friend"
            ]
        }
    }
];

constructDOM(vDOM,document.body);