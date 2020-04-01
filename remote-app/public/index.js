
'use strict';

const socket = io('/')

socket.on('connect', ()=>{
    console.log('connected');
})

// STEP 1
let requestSeqs = document.getElementById('retrieveSeqs')
requestSeqs.addEventListener('click', requestSequences)

function requestSequences(){
    socket.emit('Request_Sequences')
}

// STEP 2
socket.on('Update_Sequence_List', (data)=>{

    let seqs = JSON.parse(data)

    let selectMenu = document.getElementById('sequences')
    removeOptions(selectMenu)

    seqs.forEach(seq => {
        let option = document.createElement('option')
        option.appendChild( document.createTextNode(seq.name) )
        option.value = seq.nodeId
        selectMenu.appendChild(option)
    });

})


function removeOptions(menu){
    let numItems = menu.options.length
    for(let a= numItems-1 ; a>=0 ; a--){
        menu.removeChild( menu.options[a] )
    }
}

//STEP 3 
let render = document.getElementById('renderButton')
render.addEventListener('click', renderSeq)

function renderSeq(){
    let seq = document.getElementById('sequences').value
    socket.emit('Render_Seq', seq)
}