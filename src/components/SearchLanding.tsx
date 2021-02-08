import React from "react";
import { Col, Container, Media, Row } from "react-bootstrap";
import { useFetchMovies } from "../hooks/useFetch";
import { buildPosterPath, extractYear } from "../utils/api";

export const SearchLanding = (props: any) => {
	const { keyword } = props;
	const { status, data } = useFetchMovies(keyword);

	return (
		<div className="white" style={{ marginTop: "25px" }}>
			<Container>
				<Row>
					<Col sm={12}>
						<span
							style={{ textTransform: "uppercase", borderBottom: "1px solid gray" }}>
							Found at least {data.length} matches for "{keyword}"
						</span>
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
												<img
													width={82}
													height={125}
													className="mr-3"
													src={buildPosterPath(item.poster_path)}
													alt="Poster not available"
												/>
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
								<div>Nothing to show...</div>
							)}
						</ul>
					</Col>
					<Col sm={4}>
						<div className="section_header">Other</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default SearchLanding;
