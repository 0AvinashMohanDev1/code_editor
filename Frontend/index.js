
const runbtn = document.getElementById("runbtn")
const convertbtn = document.getElementById("convertbtn")
const debugbtn = document.getElementById("debug")
const codearea = document.getElementById("codearea")
const outputarea = document.getElementById("output")
const codeLang = document.getElementById("code")
const url = "https://code-editor-backend-ymgw.onrender.com"
const languagearea = document.getElementById("language")

require.config({
  paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor/min/vs" },
});
require(['vs/editor/editor.main'], function () {

  const editor = monaco.editor.create(document.getElementById('codearea'), {
    value: [
      '// Welcome to the AI Code Editor!',
      '',
      'function greeting() {',
      '  return "Hello, world!";',
      '}'
    ].join('\n'),
    language: 'javascript',
    theme: 'vs-dark',
  });


  editor.onDidChangeModelContent(() => {
    const code = editor.getValue();

    console.log('User code:', code);
  });

    // ------------------------------------ Convert Btn ------------------------------------
  convertbtn.addEventListener("click", () => {
    outputarea.innerHTML = `<h2>Loading...</h2>`
    const subject = {
      code: editor.getValue() || "javascript",
      language: codeLang.value
    }
    fetch(`${url}/convert`, {
      method: "POST",
      headers: {
        "content-type": "Application/JSON"
      },
      body: JSON.stringify(subject)
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const respcode = result

        outputarea.innerHTML = null
        outputarea.innerHTML = `
        <h2>Compiled Code</h2>
        <div id="outputCode" >${respcode.code}<br>${respcode.extra}</div>
        `
        console.log(respcode.code)
      })
      .catch((err) => {
        console.log(err);
        outputarea.innerHTML = `
        <h2>Compiled Code</h2>
        <div id="outputCode" >${err}</div>
        `
        console.log(err)
        console.log("error")

      })
  })


  //------------------------------------  Debug Btn ------------------------------------
  debugbtn.addEventListener("click", () => {
    outputarea.innerHTML = `<h2>Loading...</h2>`
    const subject = {
      code: editor.getValue(),
      language: languagearea.value || "javascript"
    }
    fetch(`${url}/debug`, {
      method: "POST",
      headers: {
        "content-type": "Application/JSON"
      },
      body: JSON.stringify(subject)
    }).then((res) => res.json())
      .then((result) => {
        console.log(result);
        const respcode = result

        outputarea.innerHTML = null
        outputarea.innerHTML =
          `
    <h2>Compiled Code</h2>
    <div id="outputCode" >${respcode.error}</div>
    `
        console.log(respcode.error)
      })
      .catch((err) => {
        console.log(err);
        outputarea.innerHTML = `
        <h2>Compiled Code</h2>
        <div id="outputCode" >${err}</div>
        `
        console.log(err)
        console.log("error")

      })
  })



  //------------------------------------ Run Btn ------------------------------------
  runbtn.addEventListener("click", () => {
    outputarea.innerHTML = `<h2>Loading...</h2>`
    const subject = {
      code: editor.getValue(),
      language: languagearea.value || "javascript"
    }
    fetch(`${url}/run`, {
      method: "POST",
      headers: {
        "content-type": "Application/JSON"
      },
      body: JSON.stringify(subject)
    }).then((res) => res.json())
      .then((result) => {
        console.log(result);
        const respcode = result.output

        outputarea.innerHTML = null
        outputarea.innerHTML =
          `
    <h2>Output Code</h2>
    <div id="outputCode" >${respcode}</div>
    `
        console.log(respcode)
      })
      .catch((err) => {
        console.log(err);
        outputarea.innerHTML = `
        <h2>Compiled Code</h2>
        <div id="outputCode" >${err}</div>
        `
        console.log(err)
        console.log("error")

      })
  })

});




