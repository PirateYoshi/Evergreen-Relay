var EvRe = {

    debug: false,

    log: function(toLog){
        if(this.debug) console.log(toLog);
    },

    domTreeRecurse: function(vDOM,ctx){
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
            EvRe.log("\n====================\nEntering new context...\n====================\n");
            EvRe.log(vDOM);
            // for each item in array
            // vDOM.forEach(function(item){
            for(var i=0;i<vDOM.length;i++){
                (function(){
                    var item = vDOM[i];
                    var k = Object.keys(vDOM[i])[0];
                    EvRe.log({
                        item: item,
                        k: k
                    });
                    // if item.contructor !== Object
                    EvRe.log("\nNew item...")
                    EvRe.log("Is item an Object?");
                    if(item.constructor !== Object){
                    EvRe.log("Item is NOT an Object...");
                    // ctx.createTextNode(item.toString())
                    EvRe.log("Creating el as TextNode...");
                    el = document.createTextNode(item.toString());
                    EvRe.log("Success!");
                    EvRe.log("Appending TextNode inside of ctx...");
                    ctx.appendChild(el);
                    EvRe.log("Success!");
                    // else
                    }else if(item.constructor === Object){
                        EvRe.log("Item IS an Object...");
                        // var vEl = item[Object.keys(item)[0]]
                        EvRe.log("creating vEl variable...");
                        vEl = item[Object.keys(item)[0]];
                        EvRe.log("Success!");

                        if(k === "#comment"){
                            EvRe.log("Creating el as CommentNode...");
                            el = document.createComment(item[k]);
                            EvRe.log("Success!");
                            EvRe.log("Appending CommentNode in ctx...");
                        } else {
                            // var el = item property name
                            EvRe.log("Creating el as DOMNode...");
                            el = document.createElement(Object.getOwnPropertyNames(item)[0]);
                            EvRe.log("Success!");
                            // for( var key in vEl )
                            EvRe.log("entering for-loop...");
                            for(var key in vEl){
                                if(key !== "_Content"){
                                    EvRe.log(key + " is not \"_Content\"")
                                    EvRe.log("Setting attribute...")
                                    el.setAttribute(key,vEl[key]);
                                    EvRe.log("Success!");
                                }
                            }
                            EvRe.log("Leaving for-loop...");
                            EvRe.log("Appending DOMNode in ctx...");
                        }
                        ctx.appendChild(el);
                        EvRe.log("Success!");
                        if(!!vEl._Content) {
                            EvRe.domTreeRecurse(vEl[key],el);
                            EvRe.log("Leaving ctx...");
                        }
                    }
                })();
            }
            return ctx;
        }
    },

    constructDOM: function(vDOM,ctx){
        EvRe.log("Entering vDOM...");
        var fDOM = this.domTreeRecurse(vDOM);
        EvRe.log("Leaving vDOM...");
        EvRe.log(fDOM);
        EvRe.log("Appending DOMNode in ctx...");
        ctx.appendChild(fDOM);
        EvRe.log("Success!");
    }

}