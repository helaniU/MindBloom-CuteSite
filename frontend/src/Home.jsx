import React from "react";

function Home() {
     // useEffect hook → runs side effects after the component is rendered
    React.useEffect(() => {
    window.location.href = "/dashbord.html";
    }, []);
    // Empty dependency array → means this effect runs only once (when component loads)
}

export default Home;
