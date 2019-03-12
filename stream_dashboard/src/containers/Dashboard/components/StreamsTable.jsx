import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import StreamsTableHead from './StreamsTableOldHead';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import Select from 'react-select';
import MaterialTable from 'material-table';

import {
  setStreamOnDevice,
  getAllStreams,
  getDevices,
  setProgram,
  setPreview
} from '../../../redux/actions/streamActions';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
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

    console.log('setting sort to: ', order, orderBy);

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
    const { streams, devices } = this.props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, streams.length - page * rowsPerPage);

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
              <MaterialTable
                columns={[
                  { title: 'Code', field: 'key' },
                  { title: 'Event Name', field: 'event_name' },
                  { title: 'Channel', field: 'id' },
                  {
                    title: 'Preview | Program',
                    field: 'program',
                    render: rowData => {
                      return (
                        <div>
                          <Button
                            outline
                            color="primary"
                            disabled={!rowData.device}
                            onClick={() => this.props.setPreview(rowData)}
                          >
                            Preview
                          </Button>
                          <Button
                            outline
                            color="success"
                            disabled={!rowData.device}
                            onClick={() => this.props.setProgram(rowData)}
                          >
                            Program
                          </Button>
                        </div>
                      );
                    }
                  },
                  {
                    title: 'Device',
                    field: 'device',
                    type: 'numeric',
                    render: rowData => {
                      return (
                        <div>
                          <form className="form" autoComplete="off">
                            <div className="form__form-group">
                              <div className="form__form-group-field">
                                <Select
                                  name="device"
                                  value={{ value: rowData.device, label: rowData.device }}
                                  onChange={event => this.handleChangeDevice(event, rowData)}
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
                        </div>
                      );
                    }
                  }
                ]}
                data={streams}
                title=""
                options={{
                  selection: false
                }}
              />
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = state => ({
  streams: state.streams.streams,
  devices: state.streams.devices
});

export default connect(
  mapStateToProps,
  { setStreamOnDevice, getAllStreams, getDevices, setProgram, setPreview }
)(StreamsTable);
