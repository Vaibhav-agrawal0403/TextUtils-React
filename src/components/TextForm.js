import React,{useState} from 'react'

export default function TextForm(props) {
  // function to convert in upper case characters
  const handleUpClick = ()=> {
    // console.log("Uppercase was Clicked" + text);
    let newtext = text.toUpperCase();
    setText(newtext);
    props.showAlert("Converted to upper case!","success")
  }

  // function to convert in lower case characters
  const handleLoClick = ()=> {
    // console.log("Lowercase was Clicked" + text);
    let newtext = text.toLowerCase();
    setText(newtext);
    props.showAlert("Converted to lower case!","success")
  }

  // function to clear the text
  const handleClearClick = ()=> {
    // console.log("Clear text" + text);
    let newtext = "";
    setText(newtext);
    props.showAlert("Text cleared!","success")
  }

  // use state for changing speak button state
  const [Speakbtn, setSpeakBtn] = useState('Speak')
  // function to speak the text
  const speakText = () => {
      let msg = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(msg);
      if (Speakbtn === "Speak") {
        setSpeakBtn('Stop')
        props.showAlert("Start speaking the text!","success")
      }
      else {
          window.speechSynthesis.cancel()
          setSpeakBtn('Speak')
          props.showAlert("Stop speaking the text!","success")
      }
    }

    // function to copy text
    const handleCopy = ()=>{
      // var text = document.getElementById('myBox');
      // text.select();
      // navigator.clipboard.writeText(text.value);
      // document.getSelection.removalAllRanges(); // used to deselect the text after copied

      //directly text can be used instead of making var text and then select all 
      //because text is itself is whole text
      navigator.clipboard.writeText(text);
      props.showAlert("Copied to Clipboard!","success")
    }

    //function to remove extra space in text
    const handleExtraSpace = ()=> {
      let newtext = text.split(/[ ]+/);
      setText(newtext.join(" "))
      props.showAlert("Extra space removed!","success")
    }

  const handleOnChange = (event)=> {
    // console.log("On Change");
    setText(event.target.value);
  }

  // function to remove the count of empty string
  function countWords(text){
    // /\s+/ -> use regular expression \s include by space including new line
    let wc = text.split(/\s+/).length;
    text.split(/\s+/).forEach((word) => {
        if(!word.length){
            wc -= 1;  
        }
    });
    return wc;
  }

  const [text, setText] = useState(''); // default value of text is ""
  // text="New Text"; Wrong way to change the state
  // setText("New Text"); correct way to change the state
  return (
    <>
     <div className="Container" style={{color : props.mode==='dark'?'white':'#042743'}}>
        <h1 className='mb-4'>{props.heading}</h1>
        <div className="mb-3">
            <textarea className="form-control" value={text} onChange={handleOnChange}   
            style={{backgroundColor : props.mode==='dark'?'#13466e':'white' , 
            color : props.mode==='dark'?'white':'#042743'}} id="myBox" rows="8" >
            </textarea>
        </div>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert to Lowercase</button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>Clear Text</button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy Text</button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpace}>Remove Extra Space</button>
        <button disabled={text.length===0} type="submit" onClick={speakText} className="btn btn-primary mx-1">{Speakbtn}</button>
     </div>
     <div className="container my-3 " style={{color : props.mode==='dark'?'white':'#042743'}}>
       <h2>Your text summary</h2>
       {/* remove extra space string by filter function also that return true or false my-1 */}
       {/* (text.split(/\s+/).filter((element)=>{return element.length!==0}).length) */}
       <p>{countWords(text)} words and {text.length} characters</p>
       <p>{0.008 * countWords(text)} minutes to read</p>
       <h2>Preview</h2>
       <p>{text.length>0 ? text : "Nothing to preview!"}</p>
     </div>
    </>
  )
}
