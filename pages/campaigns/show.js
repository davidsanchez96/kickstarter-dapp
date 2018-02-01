import React, { Component } from 'react';
import { Card, Grid } from 'semantic-ui-react';
import ContributeForm from '../../components/ContributeForm';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';

export default class ShowCampaign extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    return {
      address: props.query.address,
      minimumContrubution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    };
  }

  renderCards = () => {
    const {
      minimumContrubution,
      balance,
      requestsCount,
      approversCount,
      manager,
      address
    } = this.props;

    const items = [
      {
        header: manager,
        meta: 'Address of Manager',
        description:
          'The manager created this campaign and can create requests to withdraw money',
        style: {
          overflowWrap: 'break-word'
        }
      },
      {
        header: minimumContrubution,
        meta: 'Minimum Contribution (wei)',
        description:
          'You must contribute at least this much of wai to become an approver'
      },
      {
        header: requestsCount,
        meta: 'Number of Requests',
        description:
          'A requests tries to withdraw money from the contract. Request must be approved by approvers'
      },
      {
        header: approversCount,
        meta: 'Number of Approvers',
        description:
          'Number of people who have already donated to this campaign'
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description: 'This balance is how much money is left to spend'
      }
    ];

    return <Card.Group items={items} />;
  };

  render() {
    return (
      <Layout>
        <h3>Campaign details</h3>
        <Grid>
          <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={this.props.address} />
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}
