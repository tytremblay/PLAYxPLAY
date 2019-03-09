import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import StreamsTableHead from './StreamsTableHead';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import Select from 'react-select';

import {
  setStreamOnDevice,
  getAllStreams,
  getDevices,
  setProgram,
  setPreview
} from '../../../redux/actions/streamActions';

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => b[orderBy] - a[orderBy] : (a, b) => a[orderBy] - b[orderBy];
}

class StreamsTable extends PureComponent {
  state = {
    order: 'asc',
    orderBy: 'event_name',
    selected: [],
    page: 0,
    rowsPerPage: 10
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeDevice = (event, stream) => {
    this.props.setStreamOnDevice(stream, event.value);
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleDeleteSelected = () => {
    let copyData = [...this.state.data];
    const { selected } = this.state;

    for (let i = 0; i < selected.length; i += 1) {
      copyData = copyData.filter(obj => obj.id !== selected[i]);
    }

    this.setState({ data: copyData, selected: [] });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  refresh = () => {
    this.props.getAllStreams();
    this.props.getDevices();
  };

  render() {
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const { data, devices } = this.props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Streams</h5>
              <Button outline className="material-table__toolbar-button" onClick={this.refresh}>
                Refresh
              </Button>
            </div>
            <div className="material-table__wrap">
              <Table className="material-table">
                <StreamsTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={this.handleSelectAllClick}
                  onRequestSort={this.handleRequestSort}
                  rowCount={data.length}
                />
                <TableBody>
                  {data
                    .sort(getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(d => {
                      const isSelected = this.isSelected(d.id);
                      return (
                        <TableRow
                          className="material-table__row"
                          role="checkbox"
                          onClick={event => this.handleClick(event, d.id)}
                          aria-checked={isSelected}
                          tabIndex={-1}
                          key={d.id}
                          selected={isSelected}
                        >
                          <TableCell
                            className="material-table__cell"
                            component="th"
                            scope="row"
                            padding="none"
                          >
                            {d.id}
                          </TableCell>
                          <TableCell
                            className="material-table__cell"
                            component="th"
                            scope="row"
                            padding="none"
                          >
                            {d.event_name}
                          </TableCell>
                          <TableCell
                            className="material-table__cell"
                            component="th"
                            scope="row"
                            padding="none"
                          >
                            <Button
                              outline
                              color="primary"
                              disabled={!d.device}
                              onClick={() => this.props.setPreview(d)}
                            >
                              Preview
                            </Button>
                            <Button
                              outline
                              color="success"
                              disabled={!d.device}
                              onClick={() => this.props.setProgram(d)}
                            >
                              Program
                            </Button>
                          </TableCell>
                          <TableCell
                            className="material-table__cell"
                            component="th"
                            scope="row"
                            padding="none"
                          >
                            <form className="form" autoComplete="off">
                              <div className="form__form-group">
                                <div className="form__form-group-field">
                                  <Select
                                    name="device"
                                    value={{ value: d.device, label: d.device }}
                                    onChange={event => this.handleChangeDevice(event, d)}
                                    options={Object.keys(devices).map(device => ({
                                      value: device,
                                      label: device
                                    }))}
                                    placeholder="--"
                                    className="react-select"
                                    classNamePrefix="react-select"
                                  />
                                </div>
                              </div>
                            </form>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 49 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <TablePagination
              component="div"
              className="material-table__pagination"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{ 'aria-label': 'Previous Page' }}
              nextIconButtonProps={{ 'aria-label': 'Next Page' }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 15]}
            />
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = state => ({
  data: state.streams.streams,
  devices: state.streams.devices
});

export default connect(
  mapStateToProps,
  { setStreamOnDevice, getAllStreams, getDevices, setProgram, setPreview }
)(StreamsTable);
