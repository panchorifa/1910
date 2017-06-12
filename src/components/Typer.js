import React from 'react'
import { StyleSheet, css } from 'aphrodite'

const styles = StyleSheet.create({

  cursorContainer: {
    display: 'block',
    color: 'white',
	  textAlign: 'center',
	  transition: 'all 0.5s',
    userSelect: 'none'
  },

  cursorText: {
  	fontSize: '1.3em',
  	display: 'inline-block'
  },

  cursor: {
  	fontSize: '1.3em',
    fontWeight: 'bold',
  	display: 'inline-block'
  },

  animated: {
    animationDuration: '0.7s',
    animationTimingFunction: 'ease-out',
    animationIterationCount:  'infinite',
  },

  blink: {
    animationName: {
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0 }
    }
  }

})

export default class Typer extends React.Component {

	componentDidMount() {
		let textIndex = 0;
		let textArrayIndex = 0;
		let dx = 1;
		let backInterval = null;

		setInterval(function () {
			if (dx === -1) {
				return;
			}

			textIndex += dx;
      if (this.refs.cursorText) {
			  this.refs.cursorText.innerText = this.props.text[textArrayIndex].substr(0, textIndex);
      }

			if (textIndex === 0) {
				dx = 1;
				textArrayIndex = (textArrayIndex + 1) % this.props.text.length;
			}

			if (textIndex === this.props.text[textArrayIndex].length) {
				dx = -1;
				setTimeout(function () {
					backInterval = setInterval(function () {
						textIndex += dx;
            if (this.refs.cursorText) {
						  this.refs.cursorText.innerText = this.props.text[textArrayIndex].substr(0, textIndex);
            }

						if (textIndex === 0) {
							dx = 1;
							textArrayIndex = (textArrayIndex + 1) % this.props.text.length;

							clearInterval(backInterval);
						}
					}.bind(this), this.props.typeBackSpeed);
				}.bind(this), this.props.typeDelay);
			}
		}.bind(this), this.props.typeSpeed);
	}

	render() {
		return (
			<div className={css(styles.cursorContainer)}>
				<div className={css(styles.cursorText)} ref="cursorText"></div>
				<div className={css(styles.cursor, styles.animated, styles.blink)}>|</div>
			</div>
		);
	}
}

Typer.defaultProps = {
	typeSpeed: 2,
	typeBackSpeed: 5,
	typeDelay: 1000
};

// Typer.PropTypes = {
// 	typeSpeed: React.PropTypes.number,
// 	typeBackSpeed: React.PropTypes.number,
// 	typeDelay: React.PropTypes.number,
// 	text: React.PropTypes.arrayOf(React.PropTypes.string)
// }
