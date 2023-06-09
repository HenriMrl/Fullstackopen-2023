const Filter = (props) => {
    return (
      <div>
        filter: <input value={props.filter} onChange={props.handleNewFilter} />
      </div>
    );
  };
  
  export default Filter
  