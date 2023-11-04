import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/Contact/filterSlice';
import { selectFilter } from 'redux/Contact/selectors';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div>
      <h3>Find contacts by name</h3>
      <input type="text" value={filter} onChange={handleFilterChange} />
    </div>
  );
};
