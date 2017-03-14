import Relay from 'react-relay'

export default class AddBusinessMutation extends Relay.Mutation {

  static fragments = {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `,
  }

  getMutation () {
    return Relay.QL`mutation{createBusiness}`
  }

  getFatQuery () {
    return Relay.QL`
      fragment on CreateBusinessPayload {
        business
        edge
        viewer {
          allBusinesss
        }
      }
    `
  }

  getConfigs () {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'allBusinesss',
      edgeName: 'edge',
      rangeBehaviors: {
        '': 'append',
      },
    }]
  }

  getVariables () {
    return {
      name: this.props.name,
      url: this.props.url,
    }
  }

  getOptimisticResponse () {
    return {
      edge: {
        node: {
          name: this.props.name,
          url: this.props.url,
        },
      },
      viewer: {
        id: this.props.viewer.id,
      },
    }
  }
}
