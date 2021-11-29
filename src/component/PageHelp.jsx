import React from "react";
import "./PageHelp.css";
import { Wizard, Step, Controls } from "react-decision-tree-flow";

export default class PageHelp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tree: {
				root: ["needInfo", "haveQuestion", "haveIssue"],

				// Step 2

				needInfo: ["root", "needInfoCitizen", "needInfoCompany", "needInfoTechSaavy"],
				haveQuestion: ["root", "haveQuestionCitizen", "haveQuestionCompany"],
				haveIssue: ["root", "haveIssueCitizen", "haveIssueCompany"],

				// Step 3

				needInfoCitizen: ["root"],
				needInfoCompany: ["root"],
				needInfoTechSaavy: ["root"],
				haveQuestionCitizen: ["root"],
				haveQuestionCompany: ["root"],
				haveIssueCitizen: [
					"root",
					"haveIssueSuspiciousLink",
					"haveIssuePreventPhishing",
					"haveIssueInfectedPc",
					"haveIssueIllegalContent",
					"haveIssuePrivacyIssue",
					"haveIssueTelecomProvider",
					"haveIssueOtherIncident",
				],
				haveIssueCompany: [
					"root",
					"haveIssueSuspiciousLink",
					"haveIssuePreventPhishing",
					"haveIssueInfectedPc",
					"haveIssueCompanyIncident",
					"haveIssueOtherIncident",
				],

				// Step 4

				haveIssueSuspiciousLink: ["root"],
				haveIssuePreventPhishing: ["root"],
				haveIssueInfectedPc: ["root"],
				haveIssueIllegalContent: ["root"],
				haveIssuePrivacyIssue: ["root"],
				haveIssueTelecomProvider: ["root"],
				haveIssueOtherIncident: ["root"],
				haveIssueCompanyIncident: ["root"],

				error: [],
			},
		};
	}

	changeState(field, value) {
		this.setState({ [field]: value });
	}

	render() {
		return (
			<div id={"PageHelp"}>
				<div id={"PageHelp-blue-petal"} />
				<div id={"PageHelp-red-petal"} />

				<div className="row">
					<div className="col-md-12">
						<div className="PageHelp-back-button-wrapper">
							<a href="/"><i className="fas fa-arrow-circle-left"/>&nbsp; Back to the portal</a>
						</div>
					</div>

					<div className="col-md-12">
						<div id={"PageHelp-wizard"}>
							<Wizard tree={this.state.tree} first="root">
								<Step name="root">
									<h3>What do you need?</h3>
									<Controls>
										{({
											destinations: { needInfo, haveQuestion, haveIssue },
										}) => (
											<div>
												<button onClick={needInfo}>I need information</button>
												<button onClick={haveQuestion}>I have a question</button>
												<button onClick={haveIssue}>I have an issue</button>
											</div>
										)}
									</Controls>
								</Step>

								<Step name="needInfo">
									<h3> I am here as:</h3>
									<Controls>
										{({
											destinations: {
												root, needInfoCitizen, needInfoCompany, needInfoTechSaavy,
											},
										}) => (
											<div>
												<button onClick={needInfoCitizen}>a youth/parent/citizen</button>
												<button onClick={needInfoCompany}>an employee or a company</button>
												<button onClick={needInfoTechSaavy}>a tech-savvy person</button>
												<button className="PageHelp-question-back-button" onClick={root}>Reset</button>
											</div>
										)}
									</Controls>
								</Step>
								<Step name="haveQuestion">
									<h3> I am here as:</h3>
									<Controls>
										{({
											destinations: {
												root, haveQuestionCitizen, haveQuestionCompany,
											},
										}) => (
											<div>
												<button onClick={haveQuestionCitizen}>a youth/parent/citizen</button>
												<button onClick={haveQuestionCompany}>an employee or a company</button>
												<button className="PageHelp-question-back-button" onClick={root}>Reset</button>
											</div>
										)}
									</Controls>
								</Step>
								<Step name="haveIssue">
									<h3> I am here as:</h3>
									<Controls>
										{({
											destinations: {
												root, haveIssueCitizen, haveIssueCompany,
											},
										}) => (
											<div>
												<button onClick={haveIssueCitizen}>a youth/parent/citizen</button>
												<button onClick={haveIssueCompany}>an employee or a company</button>
												<button className="PageHelp-question-back-button" onClick={root}>Reset</button>
											</div>
										)}
									</Controls>
								</Step>

								<Step name="needInfoCitizen">
									<h3>
										Please visit&nbsp;
										<a
											href="https://www.bee-secure.lu/"
											target="_blank"
											rel="noreferrer">
											BEE SECURE
										</a>
									</h3>
									<Controls>
										{({
											destinations: {
												root,
											},
										}) => (
											<div>
												<button className="PageHelp-question-back-button" onClick={root}>Reset</button>
											</div>
										)}
									</Controls>
								</Step>
								<Step name="needInfoCompany">
									<h3>
										Please visit&nbsp;
										<a
											href="https://cases.lu/"
											target="_blank"
											rel="noreferrer">
											CASES Knowledgebase
										</a>
									</h3>
									<Controls>
										{({
											destinations: {
												root,
											},
										}) => (
											<div>
												<button className="PageHelp-question-back-button" onClick={root}>Reset</button>
											</div>
										)}
									</Controls>
								</Step>
								<Step name="needInfoTechSaavy">
									<h3>
										Please visit&nbsp;
										<a
											href="https://circl.lu/pub/#the-digital-first-aid-kit"
											target="_blank"
											rel="noreferrer">
											CIRCL’s Digital First Aid Kit
										</a>
									</h3>
									<Controls>
										{({
											destinations: {
												root,
											},
										}) => (
											<div>
												<button className="PageHelp-question-back-button" onClick={root}>Reset</button>
											</div>
										)}
									</Controls>
								</Step>

								<Step name="haveQuestionCitizen">
									<h3>
										Please call the BEE SECURE helpline:
									</h3>
									<h3>
										8002 1234
									</h3>
									<h3>
										9.00 to 17.00 from Monday to Friday
									</h3>
									<Controls>
										{({
											destinations: {
												root,
											},
										}) => (
											<div>
												<button className="PageHelp-question-back-button" onClick={root}>Reset</button>
											</div>
										)}
									</Controls>
								</Step>
								<Step name="haveQuestionCompany">
									<h3>
										Please contact the CASES helpline:
									</h3>
									<h3>
										<a
											href="mailto:help@cases.lu"
											target="_blank"
											rel="noreferrer">
											help@cases.lu
										</a>
									</h3>
									<Controls>
										{({
											destinations: {
												root,
											},
										}) => (
											<div>
												<button className="PageHelp-question-back-button" onClick={root}>Reset</button>
											</div>
										)}
									</Controls>
								</Step>

								<Step name="haveIssueCitizen">
									<h3>Can you tell me more about your issue?</h3>
									<Controls>
										{({
											destinations: {
												root, haveIssueSuspiciousLink, haveIssuePreventPhishing,
												haveIssueInfectedPc, haveIssueIllegalContent, haveIssuePrivacyIssue,
												haveIssueTelecomProvider, haveIssueOtherIncident,
											},
										}) => (
											<div>
												<button onClick={haveIssueSuspiciousLink}>
													I received a malicious or suspisious link
												</button>
												<button onClick={haveIssuePreventPhishing}>
													I want to prevent SPAM and phishing
												</button>
												<button onClick={haveIssueInfectedPc}>
													My PC is infected and I need support
												</button>
												<button onClick={haveIssueIllegalContent}>
													I found illegal content on the Internet, what should I do?
												</button>
												<button onClick={haveIssuePrivacyIssue}>
													I have a privacy issue
												</button>
												<button onClick={haveIssueTelecomProvider}>
													I have a problem with my telecom provider
												</button>
												<button onClick={haveIssueOtherIncident}>
													I have a different information security incident, which does
													not match any of the above categories.
												</button>
												<button className="PageHelp-question-back-button" onClick={root}>Reset</button>
											</div>
										)}
									</Controls>
								</Step>
								<Step name="haveIssueCompany">
									<h3>Can you tell me more about your issue?</h3>
									<Controls>
										{({
											destinations: {
												root, haveIssueSuspiciousLink, haveIssuePreventPhishing,
												haveIssueInfectedPc, haveIssueCompanyIncident, haveIssueOtherIncident,
											},
										}) => (
											<div>
												<button onClick={haveIssueSuspiciousLink}>
													I received a malicious or suspisious link
												</button>
												<button onClick={haveIssuePreventPhishing}>
													I want to prevent SPAM and phishing
												</button>
												<button onClick={haveIssueInfectedPc}>
													My PC is infected and I need support
												</button>
												<button onClick={haveIssueCompanyIncident}>
													I have a security incident in my company
												</button>
												<button onClick={haveIssueOtherIncident}>
													I have a different information security incident, which does
													not match any of the above categories.
												</button>
												<button className="PageHelp-question-back-button" onClick={root}>Reset</button>
											</div>
										)}
									</Controls>
								</Step>

								{/* Third question in case of "issue" selection */}

								<Step name="haveIssueSuspiciousLink">
									<h3>
										Please visit&nbsp;
										<a
											href="https://circl.lu/urlabuse"
											target="_blank"
											rel="noreferrer">
											CIRCL URLabuse
										</a>
									</h3>
									<Controls>
										{({
											destinations: {
												root,
											},
										}) => (
											<div>
												<button className="PageHelp-question-back-button" onClick={root}>Reset</button>
											</div>
										)}
									</Controls>
								</Step>
								<Step name="haveIssuePreventPhishing">
									<h3>
										Please visit&nbsp;
										<a
											href="https://spambee.lu/"
											target="_blank"
											rel="noreferrer">
											SPAMBEE
										</a>
									</h3>
									<Controls>
										{({
											destinations: {
												root,
											},
										}) => (
											<div>
												<button className="PageHelp-question-back-button" onClick={root}>Reset</button>
											</div>
										)}
									</Controls>
								</Step>
								<Step name="haveIssueInfectedPc">
									<h3>
										Please check the&nbsp;
										<a
											href="https://ecosystem.cybersecurity-luxembourg.com/"
											target="_blank"
											rel="noreferrer">
											Cybersecurity ecosystem
										</a>
									</h3>
									<Controls>
										{({
											destinations: {
												root,
											},
										}) => (
											<div>
												<button className="PageHelp-question-back-button" onClick={root}>Reset</button>
											</div>
										)}
									</Controls>
								</Step>
								<Step name="haveIssueIllegalContent">
									<h3>
										Please report via the&nbsp;
										<a
											href="https://stopline.bee-secure.lu/"
											target="_blank"
											rel="noreferrer">
											BEE SECURE Stopline
										</a>
									</h3>
									<Controls>
										{({
											destinations: {
												root,
											},
										}) => (
											<div>
												<button className="PageHelp-question-back-button" onClick={root}>Reset</button>
											</div>
										)}
									</Controls>
								</Step>
								<Step name="haveIssuePrivacyIssue">
									<h3>
										Please notify or complain to the&nbsp;
										<a
											href="https://cnpd.public.lu/en/particuliers/faire-valoir.html"
											target="_blank"
											rel="noreferrer">
											CNPD
										</a>
									</h3>
									<Controls>
										{({
											destinations: {
												root,
											},
										}) => (
											<div>
												<button className="PageHelp-question-back-button" onClick={root}>Reset</button>
											</div>
										)}
									</Controls>
								</Step>
								<Step name="haveIssueTelecomProvider">
									<h3>
										Please contact the&nbsp;
										<a
											href="https://web.ilr.lu/mediation/FR/Mediation/Pages/HomePage.aspx?mode=part&lg=fr"
											target="_blank"
											rel="noreferrer">
											ILR mediation service (FR)
										</a>
									</h3>
									<Controls>
										{({
											destinations: {
												root,
											},
										}) => (
											<div>
												<button className="PageHelp-question-back-button" onClick={root}>Reset</button>
											</div>
										)}
									</Controls>
								</Step>
								<Step name="haveIssueCompanyIncident">
									<h3>
										Please report the incident to&nbsp;
										<a
											href="https://circl.lu/report/"
											target="_blank"
											rel="noreferrer">
											CIRCL
										</a>
									</h3>
									<Controls>
										{({
											destinations: {
												root,
											},
										}) => (
											<div>
												<button className="PageHelp-question-back-button" onClick={root}>Reset</button>
											</div>
										)}
									</Controls>
								</Step>
								<Step name="haveIssueOtherIncident">
									<h3>
										Please report the incident to&nbsp;
										<a
											href="https://circl.lu/report/"
											target="_blank"
											rel="noreferrer">
											CIRCL
										</a>
									</h3>
									<Controls>
										{({
											destinations: {
												root,
											},
										}) => (
											<div>
												<button className="PageHelp-question-back-button" onClick={root}>Reset</button>
											</div>
										)}
									</Controls>
								</Step>
							</Wizard>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
