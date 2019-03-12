import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

export default class StreamsTableOldHead extends PureComponent {
  static propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
  };

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
    const rows = [
      { id: 'key', disablePadding: false, label: 'Code' },
      {
        id: 'event_name',
        disablePadding: true,
        label: 'Event Name'
      },
      {
        id: 'name',
        disablePadding: false,
        label: 'Channel'
      },
      {
        id: 'program',
        disablePadding: false,
        label: 'Preview | Program'
      },
      {
        id: 'device',
        disablePadding: false,
        label: 'Device'
      }
    ];

    return (
      <TableHead>
        <TableRow>
          {rows.map(
            row => (
              <TableCell
                className="material-table__cell material-table__cell--sort"
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === row.id}
                  direction={order}
                  onClick={this.createSortHandler(row.id)}
                  className="material-table__sort-label"
                >
                  {row.label}
                </TableSortLabel>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}
