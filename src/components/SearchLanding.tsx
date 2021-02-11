import React from "react";
import { Badge, Col, Container, Form, Media, Row } from "react-bootstrap";
import { useFetchMovies } from "../hooks/useFetch";
import { buildPosterPath, extractYear } from "../utils/api";
import Poster from "./Poster";

export const SearchLanding = (props: any) => {
	const { keyword } = props;
	const { status, data } = useFetchMovies(keyword);

	return (
		<div className="white" style={{ marginTop: "25px" }}>
			<Container>
				<Row>
					<Col sm={12}>
						{/* <Form>
							<Form.Row>
								<Form.Control placeholder="Search movies, actors, or anything."></Form.Control>
							</Form.Row>
						</Form> */}
					</Col>
				</Row>

				<Row>
					<Col sm={8}>
						<ul className="list-unstyled" style={{ paddingTop: "15px" }}>
							{status === "fetched" ? (
								data.map((item: any, idx: number) => {
									return (
										<li
											style={{
												borderBottom: "1px solid gray",
												padding: "15px",
												marginBottom: "15px",
											}}
											className="white"
											key={idx}>
											<Media>
												{/* //TODO: convert to Poster with Link - reuse everywhere */}
												<Poster item={item} />
												{/* <img
													width={82}
													height={125}
													className="mr-3"
													src={buildPosterPath(item.poster_path)}
													alt="Poster not available"
												/> */}
												<Media.Body>
													<h5>
														{item.title}{" "}
														<span style={{ color: "gray" }}>
															{extractYear(item.release_date)}
														</span>
													</h5>

													<p style={{ fontSize: "0.8rem" }}>
														{item.overview}
													</p>
												</Media.Body>
											</Media>
										</li>
									);
								})
							) : (
								<></>
							)}
						</ul>
					</Col>
					<Col sm={4}>
						{data.length > 0 ? (
							<div className="white">
								{data.length} matches for <em>{keyword}</em>
							</div>
						) : (
							<></>
						)}
						<div className="white">
							Filter by
							<Badge pill variant="secondary">
								Actor
							</Badge>
							<Badge pill variant="secondary">
								Director
							</Badge>
							<Badge pill variant="secondary">
								Movie
							</Badge>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default SearchLanding;
