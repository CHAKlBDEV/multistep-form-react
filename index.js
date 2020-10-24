import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MultiStepForm extends Component {
	constructor(props) {
		super(props);

		this.state = { currentStep: 0 };

		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
		this.canGoNext = this.canGoNext.bind(this);
		this.canGoBack = this.canGoBack.bind(this);
		this.getWidth = this.getWidth.bind(this);
		this.disableNextBtn = this.disableNextBtn.bind(this);
	}

	next() {
		if (this.canGoNext()) {
			this.setState({ currentStep: this.state.currentStep + 1 });
		} else {
			this.props.onSubmit();
		}
	}

	previous() {
		if (this.canGoBack()) {
			this.setState({ currentStep: this.state.currentStep - 1 });
		}
	}

	canGoNext() {
		return this.state.currentStep < this.props.steps.length - 1;
	}

	disableNextBtn() {
		if (this.props.steps[this.state.currentStep].validator) {
			return !this.props.steps[this.state.currentStep].validator();
		} else {
			return false;
		}
	}

	canGoBack() {
		return this.state.currentStep !== 0;
	}

	getWidth() {
		const { currentStep } = this.state;
		const { steps } = this.props;

		return ((currentStep + 1) / steps.length) * 100;
	}

	render() {
		const { currentStep } = this.state;
		const { primaryColor, isLoading } = this.props;

		return (
			<div style={{ width: '100%' }}>
				<div
					id='title'
					style={{
						display: 'flex',
						flexWrap: 'nowrap',
						justifyContent: 'space-between',
						color: '#6c757d',
						marginBottom: '5px',
					}}
				>
					<span>{this.props.steps[currentStep].title}</span>
					<span>
						STEP {`${currentStep + 1}/${this.props.steps.length}`}
					</span>
				</div>
				<div id='progressbar' style={{ height: '10px' }}>
					<div id='container' style={{ height: '100%' }}>
						<div
							id='progress'
							style={{
								transition: 'width .5s',
								backgroundColor: primaryColor || '#3ca891',
								width: `${this.getWidth()}%`,
								height: '100%',
								borderRadius: '3px',
							}}
						></div>
					</div>
				</div>
				<div id='component'>
					{this.props.steps[currentStep].component}
				</div>
				<div
					id='buttons'
					style={{
						display: 'flex',
						flexWrap: 'nowrap',
						justifyContent: 'space-between',
					}}
				>
					<button
						onClick={this.previous}
                        disabled={!this.canGoBack() || isLoading}
                        style={{
                            background: 'none',
                            borderWidth: '1px',
                            borderColor: this.props.accentColor || '#007bff',
                            borderStyle: 'solid',
                            outline:'none',
                            color: this.props.accentColor || '#007bff',
                            borderRadius: '3px',
                            opacity: (!this.canGoBack() || isLoading) ? '0.3' : '1'
						}}
					>
						Previous
					</button>
					<button
						onClick={this.next}
                        disabled={isLoading || this.disableNextBtn()}
                        style={{
                            backgroundColor: this.props.accentColor || '#007bff',
                            color: 'white',
                            border: 'none',
                            outline: 'none',
                            borderRadius: '3px',
                            opacity: isLoading || this.disableNextBtn() ? '0.3' : '1'
						}}
					>
						{this.canGoNext() ? 'Next' : 'Finish'}
					</button>
				</div>
			</div>
		);
	}
}

MultiStepForm.propTypes = {
	steps: PropTypes.arrayOf(
		PropTypes.shape({
			component: PropTypes.element.isRequired,
			title: PropTypes.string.isRequired,
			validator: PropTypes.func,
		})
	).isRequired,
	isLoading: PropTypes.bool.isRequired,
	onSubmit: PropTypes.func.isRequired,
	primaryColor: PropTypes.string,
	accentColor: PropTypes.string,
};

export default MultiStepForm;
