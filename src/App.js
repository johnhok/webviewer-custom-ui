import React, { useRef, useState, useCallback } from "react";
import "./App.css";

const App = () => {
  const [isVisible, setIsVisible] = useState(true);

  const viewer = useRef(null);
  const scrollView = useRef(null);

  // if using a class, equivalent of componentDidMount
  const loadViewer = useCallback(() => {
    const Core = window.Core;
    Core.setWorkerPath("/webviewer");

    const documentViewer = new Core.DocumentViewer();
    documentViewer.setScrollViewElement(scrollView.current);
    documentViewer.setViewerElement(viewer.current);
    documentViewer.loadDocument("/files/demo.pdf");

    documentViewer.addEventListener("documentLoaded", () => {
      console.log("document loaded");
      setTimeout(async function () {
        await documentViewer.closeDocument();
        console.log("Document is closed");
        await documentViewer.dispose();
        console.log("Document is disposed");
        setIsVisible(false);
      }, 3000);
    });
  }, []);

  return (
    <div className="App">
      <button
        onClick={() => {
          setIsVisible(true);
          loadViewer();
        }}
      >
        Load viewer
      </button>
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
