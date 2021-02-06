import "./Showcase.css";
import "./App.css";
import { Button } from "react-bootstrap";

export const Showcase = () => {
	return (
		<div className="showcase_container">
			<div className="showcase_content">
				<div className="showcase_title">
					<h2>
						Track films you’ve watched.<br/>Save those you want to see.<br/>Tell your friends
						what’s good.
					</h2>
				</div>
				<div className="showcase_button">
					<Button>Get Started - It's Free</Button>
				</div>
				<div className="showcase_subtitle">
					{" "}
					The social network for film lovers. Also available on 
					<span className="showcase_brand_icon--apple"></span>
					<span className="showcase_brand_icon--android"></span>
				</div>

				<p>A letterboxd clone.</p>
			</div>
		</div>
	);
};
