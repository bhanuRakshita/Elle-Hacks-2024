export default function DataDisplayComponent({ data }) {
    const formatObject = (obj) => {
      return Object.keys(obj).map(key => {
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && obj[key] !== null) {
          // Recursive call for nested objects
          return <div key={key}><strong>{key}:</strong> {formatObject(obj[key])}</div>;
        } else if (Array.isArray(obj[key])) {
          // Map through the array and recursively call formatObject for each item
          return (
            <div key={key}>
              <strong>{key}:</strong>
              {obj[key].map((item, index) => (
                <div key={index}>{formatObject(item)}</div>
              ))}
            </div>
          );
        } else {
          // Directly display the value
          return <div key={key}><strong>{key}:</strong> {obj[key]}</div>;
        }
      });
    };
  
    return (
      <div className="data-display">
        {formatObject(data)}
      </div>
    );
  }
  