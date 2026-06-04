import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

import Draggable from 'react-draggable';
//import Board, { moveCard } from "@asseinfo/react-kanban";
//import '@asseinfo/react-kanban/dist/styles.css'
// Images
import back from './../../../assets/images/back1.jpg';
import pic1 from './../../../assets/images/profile/small/pic1.jpg';
import pic2 from './../../../assets/images/profile/small/pic2.jpg';
import pic3 from './../../../assets/images/profile/small/pic3.jpg';
import pic4 from './../../../assets/images/profile/small/pic4.jpg';
import pic5 from './../../../assets/images/profile/small/pic5.jpg';

import pic11 from './../../../assets/images/contacts/pic11.jpg';
import pic22 from './../../../assets/images/contacts/pic22.jpg';
import pic33 from './../../../assets/images/contacts/pic33.jpg';
import pic222 from './../../../assets/images/contacts/pic222.jpg';

//import KanbanData from './Kanban/KanbanData';
//import DregKanban from './Kanban/DregKanban';

//Import
import { board } from './Kanban/KanbanData';

function DropdownBox() {
	return (
		<Dropdown>
			<Dropdown.Toggle variant="" as="div" className="i-false" >
				<Link to={"#"} data-toggle="dropdown" aria-expanded="false">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="3.5" cy="11.5" r="2.5" transform="rotate(-90 3.5 11.5)" fill="#717579" />
						<circle cx="11.5" cy="11.5" r="2.5" transform="rotate(-90 11.5 11.5)" fill="#717579" />
						<circle cx="19.5" cy="11.5" r="2.5" transform="rotate(-90 19.5 11.5)" fill="#717579" />
					</svg>
				</Link>
			</Dropdown.Toggle>
			<Dropdown.Menu className="dropdown-menu-right" menuAlign="right">
				<Dropdown.Item >Edit </Dropdown.Item>
				<Dropdown.Item >Delete </Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	)
}

const Kanban = () => {
	return (
		<>
			<div className="row">
				<div className="col-xl-12">
					<div className="row">
						<div className="col-xl-12">
							<div className="card overflow-hidden">
								<div className="company-profile">
									<img src={back} alt="" />
								</div>
								<div className="card-body">
									<div className="row">
										<div className="col-xl-8">
											<div>
												<h4 className="fs-32 font-w700">Workload  Company Profile Websites Development</h4>
												<span className="mb-2 d-block">Created by Tommy Hank on June 31, 2023</span>
												<div className="workload-button">
													<Link to={"#"} className="btn btn-primary btn-rounded">New<i className="fas fa-caret-down ms-2 "></i></Link>
													<Link to={"#"} className="btn btn-primary light btn-rounded"><i className="fas fa-user-plus  me-3"></i>Invite People</Link>
													<Link to={"#"} className="btn btn-outline-light btn-rounded">Edit</Link>
													<Link to={"#"} className="btn btn-outline-light btn-rounded">Private</Link>
													<Link to={"#"} className="btn btn-outline-light btn-rounded"><i className="far fa-envelope  me-3 text-primary"></i>45 Comments</Link>
												</div>
											</div>
										</div>
										<div className="col-xl-4 info">
											<div className="d-flex justify-content-end">
												<span><i className="fas fa-info-circle me-3"></i>Project Details</span>
												<Dropdown className="dropdown ms-3">
													<Dropdown.Toggle as="div" className="btn-link i-false" >
														<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
															<circle cx="12.4999" cy="3.5" r="2.5" fill="#A5A5A5" />
															<circle cx="12.4999" cy="11.5" r="2.5" fill="#A5A5A5" />
															<circle cx="12.4999" cy="19.5" r="2.5" fill="#A5A5A5" />
														</svg>
													</Dropdown.Toggle>
													<Dropdown.Menu className="dropdown-menu dropdown-menu-right">
														<Dropdown.Item>Delete</Dropdown.Item>
														<Dropdown.Item>Edit</Dropdown.Item>
													</Dropdown.Menu>
												</Dropdown>
											</div>
											<div className="justify-content-end d-flex">
												<ul className="kanbanimg me-3 mb-3 mt-sm-0 mt-3">
													<li><img src={pic1} alt="" /></li>
													<li><img src={pic2} alt="" /></li>
													<li><img src={pic3} alt="" /></li>
													<li><img src={pic4} alt="" /></li>
													<li><img src={pic5} alt="" /></li>
													<li><span>5+</span></li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row kanban-bx">
						{board.map((item, ind) => (
							<div className="col" key={ind}>
								<div className="kanbanPreview-bx">
									<div className="draggable-zone dropzoneContainer">
										<div className="sub-card align-items-center d-flex justify-content-between mb-4">
											<div>
												<h4 className="fs-20 mb-0 font-w600">{item.maintitle} (<span className="totalCount">{item.number}</span>)</h4>
											</div>
											<div className="plus-bx">
												<Link to={"#"}><i className="fas fa-plus"></i></Link>
											</div>
										</div>

										{item.cards.map((data, index) => (
											<Draggable key={index}>
												<div className="card draggable-handle draggable">
													<div className="card-body">
														<div className="d-flex justify-content-between mb-2">
															<span className={`text-${data.changeClass}`}>
																<svg className="me-2" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<circle cx="5" cy="5" r="5" fill={data.svgcolor} />
																</svg>

																Databse
															</span>
															<DropdownBox />
														</div>
														<p className="font-w600 fs-18"><Link to={"#"} className="text-black">{data.title}</Link></p>
														<div className="progress default-progress my-4">
															<div
																className={`progress-bar bg-design progress-animated bg-${data.changeClass}`}
																style={{ width: "45%", height: "10px" }} role="progressbar"
															>
																<span className="sr-only">45% Complete</span>
															</div>
														</div>
														<div className="row justify-content-between align-items-center kanban-user">
															{index === 0 ?
																<ul className="users col-6">
																	<li><img src={pic22} alt="" /></li>
																	<li><img src={pic222} alt="" /></li>
																</ul>
																:
																index === 1 ?
																	<ul className="users col-6">
																		<li><img src={pic22} alt="" /></li>
																		<li><img src={pic11} alt="" /></li>
																		<li><img src={pic33} alt="" /></li>
																	</ul>
																	:
																	index === 2 ?

																		<ul className="users col-6">
																			<li><img src={pic22} alt="" /></li>
																			<li><img src={pic11} alt="" /></li>
																			<li><img src={pic33} alt="" /></li>
																			<li><img src={pic222} alt="" /></li>
																		</ul>
																		:
																		<ul className="users col-6">
																			<li><img src={pic222} alt="" /></li>
																		</ul>
															}
															<div className="col-6 d-flex justify-content-end">
																<span className="fs-14"><i className="far fa-clock me-2"></i>Due in 4 days</span>
															</div>
														</div>
													</div>
												</div>
											</Draggable>
										))}
									</div>
								</div>
							</div>
						))}
					</div>

					{/* <DregKanban /> */}
				</div>
			</div>
		</>
	)
}
export default Kanban;