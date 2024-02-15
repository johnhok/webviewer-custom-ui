import React, { useRef, useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [isVisible, setIsVisible] = useState(true);

  const viewer = useRef(null);
  const scrollView = useRef(null);
  const timeoutRef = useRef(null);

  // if using a class, equivalent of componentDidMount
  useEffect(() => {
    let Core = window.Core;
    Core.setWorkerPath("/webviewer");

    let documentViewer = new Core.DocumentViewer();
    documentViewer.setScrollViewElement(scrollView.current);
    documentViewer.setViewerElement(viewer.current);
    documentViewer.loadDocument("/files/demo.pdf");

    documentViewer.addEventListener("documentLoaded", () => {
      console.log("document loaded");
      timeoutRef.current = setTimeout(async function () {
        await documentViewer.closeDocument();
        console.log("Document is closed");
        await documentViewer.dispose();
        console.log("Document is disposed");
        setIsVisible(false);
        timeoutRef.current = null;
        documentViewer = null;
        Core = null;
      }, 10000);
    });
  }, []);

  return (
    <div className="App">
      {isVisible ? (
        <div className="viewer">
          <div id="main-column">
            <div
              className="flexbox-container"
              id="scroll-view"
              ref={scrollView}
            >
              <div id="viewer" ref={viewer}></div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default App;
