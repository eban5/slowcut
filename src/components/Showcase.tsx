import React, { useState } from "react";
import "../styles/Showcase.css";
import "../styles/App.css";
import { Button, Modal } from "react-bootstrap";
import LoginForm from "./LoginForm";

export const Showcase = () => {
	const [show, setShow] = useState<boolean>(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<div className="showcase_container">
			<div className="showcase_content">
				<div className="showcase_title">
					<h2>
						Track films you’ve watched.
						<br />
						Save those you want to see.
						<br />
						Tell your friends what’s good.
					</h2>
				</div>
				<div className="showcase_button">
					<Button variant="primary" onClick={handleShow}>
						Get Started - It's Free
					</Button>
					<Modal show={show} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Sign In</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<LoginForm />
						</Modal.Body>
					</Modal>
				</div>
				<div className="showcase_subtitle">
					{" "}
					The social network for film lovers. Also available on
					<span className="showcase_brand_icon--apple"></span>
					<span className="showcase_brand_icon--android"></span>
				</div>
			</div>
		</div>
	);
};
