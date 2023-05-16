let str = `let x = 10;
        let y = x+10;
        var z = 20;
        console.log("Hello\\"world");
      `;

      let ops = "+-/*();=\\.".split("");

      let keywords = ["let", "var", "const"];

      let tokens = [];

      let token = "";
      let inString = false;
      let stringChar = null;
      function addToken() {
        if (token == "") {
          return;
        }
        let type = "number";
        if (inString) {
          type = "string";
        } else if (ops.indexOf(token) !== -1) {
          type = "operator";
        } else if (token.match(/[a-z]/gi)) {
          if (keywords.indexOf(token) !== -1) {
            type = "keyword";
          } else {
            type = "identifier";
          }
        }

        tokens.push({ token, type });
        token = "";
      }

      for (let i = 0; i < str.length; i++) {
        let nxt = str[i + 1];
        let char = str[i];
        let prev = str[i - 1];

        if (inString) {
          if (char == stringChar && prev !== "\\") {
            addToken();
            inString = false;
            stringChar = null;
          } else {
            token += char;
          }
        } else if (char == "'" || char == '"') {
          addToken();
          inString = true;
          stringChar = char;
        } else if (char == " " || char == "\n") {
          if (token !== "") {
            addToken();
          }
        } else if (ops.indexOf(char) !== -1) {
          addToken();
          token = char;
          addToken();
        } else {
          token += char;
        }
      }
      if (token !== "") {
        addToken();
      }

      console.table(tokens);