function Subject(){
    const subjects = ['React', 'ReactNative', 'NodeJS'];
    return (
        <div>
            <h1>Course name: </h1>
            <ul>
                {subjects.map((subject, index) => (
                    <li key={index}>{subject}</li>
                ))}
            </ul>
        </div>
    )
}

export default Subject