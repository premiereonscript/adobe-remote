(function () {
	'use strict';
	themeManager.init();
	var cs = new CSInterface();
	
	const  io = require('socket.io-client')

	let message = document.getElementById('tempText')

	const socket = io('https://adobe-remote.herokuapp.com/')
	socket.on('connect', ()=>{
		console.log('connected');
		
		socket.on('Request_Sequences_Ppro', ()=>{
			cs.evalScript('getSeqs()', (seqs)=>{
				message.innerText = 'Sending Sequences'
				socket.emit('Sequence_List', seqs)
			})
		})

		socket.on('Render_Seq_Ppro', (nodeId)=>{
			message.innerText = 'Rendering Sequence'
			cs.evalScript(`renderSeq("${nodeId}")`)
		})
	})

}());