import React, { useRef, useState, useEffect } from "react";
import "./App.css";

const Internal = () => {
  const viewer = useRef(null);
  const scrollView = useRef(null);
  const timeoutRef = useRef(null);

  // if using a class, equivalent of componentDidMount
  useEffect(() => {
    const Core = window.Core;
    Core.setWorkerPath("/webviewer");

    const documentViewer = new Core.DocumentViewer();
    documentViewer.setScrollViewElement(scrollView.current);
    documentViewer.setViewerElement(viewer.current);
    documentViewer.loadDocument("/files/demo.pdf");

    documentViewer.addEventListener("documentLoaded", () => {
      console.log("document loaded");
    });

    return () => {
      documentViewer.closeDocument();
      console.log("Document is closed");
      documentViewer.dispose();
      console.log("Document is disposed");
    };
  }, []);

  return (
    <div className="App">
      <div className="viewer">
        <div id="main-column">
          <div className="flexbox-container" id="scroll-view" ref={scrollView}>
            <div id="viewer" ref={viewer}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 10000);
  });

  return isVisible ? <Internal /> : null;
};

export default App;
