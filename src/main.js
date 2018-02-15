/*
  eslint-disable react/prefer-stateless-function, react/jsx-boolean-value,
  no-undef, jsx-a11y/label-has-for, react/jsx-first-prop-new-line
*/
class DevicesDashboard extends React.Component {
  state = {
    divices: [
      {
        id: uuid.v4(),
        desc: 'Dev-01',
      },
      {
        id: uuid.v4(),
        desc: 'Dev-02',
      },
      {
        id: uuid.v4(),
        desc: 'Dev-03',
      },
    ],
  };

  handleCreateFormSubmit = (device) => {
    this.createDevice(device);
  };

  handleEditFormSubmit = (attrs) => {
    this.updateDevice(attrs);
  };

  handleTrashClick = (deviceId) => {
    this.deleteDevice(deviceId);
  };

  //TODO: implementar
  createDevice = (device) => {
    /*
    const t = helpers.newTimer(timer);
    this.setState({
      timers: this.state.timers.concat(t),
    });
    */
  };

  updateDevice = (attrs) => {
    this.setState({
      devices: this.state.devices.map((device) => {
        if (device.id === attrs.id) {
          return Object.assign({}, device, {
            desc: attrs.desc,
          });
        } else {
          return device;
        }
      }),
    });
  };

  deleteDevice = (deviceId) => {
    this.setState({
      devices: this.state.devices.filter(d => d.id !== deviceId),
    });
  };  

  render() {
    return (
      <div className='ui three column centered grid'>
        <div className='column'>
          <EditableDeviceList
            devices={this.state.devices}
            onFormSubmit={this.handleEditFormSubmit}
            onTrashClick={this.handleTrashClick}
          />
          <ToggleableDeviceForm
            onFormSubmit={this.handleCreateFormSubmit}
          />
        </div>
      </div>
    );
  }
}

class EditableDeviceList extends React.Component {
  render() {

    const devices = this.props.devices.map((device) => (
      <EditableDevice
        id={device.id}
        desc={device.desc}
        onFormSubmit={this.props.onFormSubmit}
        onTrashClick={this.props.onTrashClick}
      />
    ));
    return (
      <div id='devices'>
        {devices}
      </div>
    );
  }
}

class EditableDevice extends React.Component {
  state = {
    editFormOpen: false,
  };

  handleEditClick = () => {
    this.openForm();
  };

  handleFormClose = () => {
    this.closeForm();
  };

  handleSubmit = (timer) => {
    this.props.onFormSubmit(timer);
    this.closeForm();
  };

  closeForm = () => {
    this.setState({ editFormOpen: false });
  };

  openForm = () => {
    this.setState({ editFormOpen: true });
  };

  render() {
    if (this.state.editFormOpen) {
      return (
        <DeviceForm
          id={this.props.id}
          desc={this.props.desc}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {
      return (
        <Device
          id={this.props.id}
          desc={this.props.desc}
          onEditClick={this.handleEditClick}
          onTrashClick={this.props.onTrashClick}
        />
      );
    }
  }
}

class ToggleableDeviceForm extends React.Component {
  state = {
    isOpen: false,
  };

  handleFormOpen = () => {
    this.setState({ isOpen: true });
  };

  handleFormClose = () => {
    this.setState({ isOpen: false });
  };

  handleFormSubmit = (device) => {
    this.props.onFormSubmit(device);
    this.setState({ isOpen: false });
  };

  render() {
    if (this.state.isOpen) {
      return (
        <DeviceForm
          onFormSubmit={this.handleFormSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {
      return (
        <div className='ui basic content center aligned segment'>
          <button
            className='ui basic button icon'
            onClick={this.handleFormOpen}
          >
            <i className='plus icon' />
          </button>
        </div>
      );
    }
  }
}

class DeviceForm extends React.Component {
  state = {
    desc: this.props.desc || '',
  };

  handleDescChange = (e) => {
    this.setState({ desc: e.target.value });
  };

  handleSubmit = () => {
    this.props.onFormSubmit({
      id: this.props.id,
      desc: this.state.desc,
    });
  };

  render() {
    const submitText = this.props.id ? 'Update' : 'Create';
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label>Descrição</label>
              <input
                type='text'
                value={this.state.desc}
                onChange={this.handleDescChange}
              />
            </div>
            <div className='ui two bottom attached buttons'>
              <button
                className='ui basic blue button'
                onClick={this.handleSubmit}
              >
                {submitText}
              </button>
              <button
                className='ui basic red button'
                onClick={this.props.onFormClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Device extends React.Component {
  handleTrashClick = () => {
    this.props.onTrashClick(this.props.id);
  };

  render() {
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='header'>
            {this.props.desc}
          </div>
          <div className='extra content'>
            <span
              className='right floated edit icon'
              onClick={this.props.onEditClick}
            >
              <i className='edit icon' />
            </span>
            <span
              className='right floated trash icon'
              onClick={this.handleTrashClick}
            >
              <i className='trash icon' />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <DevicesDashboard />,
  document.getElementById('content')
);
