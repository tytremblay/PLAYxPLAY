import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from 'mdi-react/DeleteIcon';
import StreamsTableFilterButton from './StreamsTableFilterButton';

const StreamsTableToolbar = ({ numSelected, handleDeleteSelected, onRequestSort }) => (
  <div className="material-table__toolbar-wrap">
    <Toolbar className="material-table__toolbar">
      <div>
        {numSelected > 0 && (
          <h5 className="material-table__toolbar-selected">
            {numSelected} <span>selected</span>
          </h5>
        )}
      </div>
      <div>
        {numSelected > 0 ? (
          <IconButton onClick={handleDeleteSelected} className="material-table__toolbar-button">
            <DeleteIcon />
          </IconButton>
        ) : (
          <StreamsTableFilterButton onRequestSort={onRequestSort} />
        )}
      </div>
    </Toolbar>
  </div>
);

StreamsTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  handleDeleteSelected: PropTypes.func.isRequired,
  onRequestSort: PropTypes.func.isRequired
};

export default StreamsTableToolbar;
