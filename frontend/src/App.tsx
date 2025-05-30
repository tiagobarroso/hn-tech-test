import { useState } from "react";
import "./App.css";
import * as snippetService from "./services/snippet";

function App() {
    const [textAreText, setTextAreaText] = useState("");
    const [snippetResultList, setSnippetResultList] = useState<any[]>([]);

    const getSummary = async (text: string) => {
        
        let newSnippetReq = await snippetService.getSummary(text);

        let newSnippet = await newSnippetReq.json();
        setSnippetResultList((current) => current.concat([newSnippet]));

        setTextAreaText("");
    };

    return (
        <div className="container">
            <div className="historyContainer">
                {snippetResultList.map((s) => {
                    s.text = `${s.text.slice(0, 200)}...`;
                    return (
                        <div className="historyCard">
                            <div className="summary">{s.summary}</div>
                            <hr />
                            <div>
                                <i>
                                    <small>text: {s.text}</small>
                                </i>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="inputContainer">
                <div className="textAreaContainer">
                    <textarea
                        value={textAreText || ""}
                        onChange={(e) => setTextAreaText(e.target.value)}
                    ></textarea>
                </div>
                <div className="buttonContainer">
                    <button onClick={() => getSummary(textAreText)}>
                        GET SNIPPET
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
