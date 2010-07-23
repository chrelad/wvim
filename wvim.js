var wVim = {
	"keyBindings":[],
	"commandEntryMode":false,
	"commandMode":false,
	"clearKeyups":function(){
		$('#entry').unbind('keyup');
		$('#command').unbind('keyup');
		$('#insert').unbind('keyup');
	},
	"activateEntryMode":function(){
		this.clearKeyups();
		if(this.entryMode)
			return false;
		$('#entry').html(':');
		$('#entry').focus();
		$('#entry').keyup(this.entryKeyup);
		this.entryMode = true;
		this.commandMode = false;
		this.insertMode = false;
	},
	"activateInsertMode":function(){
		this.clearKeyups();
		if(this.insertMode)
			return false;
		$('#insert').focus();
		$('#insert').keyup(this.insertKeyup);
		this.entryMode = false;
		this.commandMode = false;
		this.insertMode = true;
	},
	"activateCommandMode":function(){
		this.clearKeyups();
		if(this.commandMode)
			return false;
		$('#command').html('');
		$('#command').focus();
		$('#command').keyup(this.commandKeyup);
		this.entryMode = false;
		this.commandMode = true;
		this.insertMode = false;
	},
	"bindKey":function(keys, func){
		this.keyBindings.push({
			"keys":keys,
			"func":func
		});
	},
	"commandKeyup":function(event){
		if(event.shiftKey){
			switch(event.keyCode){
				case 186:
					wVim.activateEntryMode();
					event.preventDefault();
					event.stopPropagation();
					return true;
			}
		}
		switch(event.keyCode){
			case 73:
				wVim.activateInsertMode();
				event.preventDefault();
				event.stopPropagation();
				return true;
		}
		for(var i = 0; i < wVim.keyBindings.length; i++){
			if(jQuery.inArray(event.keyCode, wVim.keyBindings[i].keys) != -1){
				wVim.keyBindings[i].func();
				event.stopPropagation();
				return true;
			}
		}
	},
	"entryKeyup":function(event){
		switch(event.keyCode){
			case 13:
				wVim.runEntry();
				event.preventDefault();
				break;
		}
	},
	"insertKeyup":function(event){
		switch(event.keyCode){
			case 27:
				wVim.activateCommandMode();
				event.preventDefault();
				break;
		}
	},
	"setSel":function(start, end){
		if($('#input').setSelectionRange){
			$('#input').focus();
			$('#input').setSelectionRange(start, end);
		} else {
			var range = $('#input').createTextRange();
			range.collapse(true);
			range.moveEnd('character', end);
			range.moveStart('character', start);
			range.select();
		}
	},
	"runEntry":function(){
		this.activateCommandMode();
	},
	"init":function(){
		this.activateInsertMode();
	}
};
wVim.caretToEndOfLine = function(){
	alert('Sending the caret to the end of the line');
}
wVim.bindKey([65], wVim.caretToEndOfLine);
wVim.init();
