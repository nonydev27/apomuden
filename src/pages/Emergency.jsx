import { Link } from 'react-router-dom'
import '../styles/ui.css'
import './StaticPages.css'

export function Emergency() {
  return (
    <div className="page static">
      <h1 className="page-title brand-font">When to seek care</h1>
      <p className="page-lead">
        Use this as a quick gut-check. It is not exhaustive — when unsure,
        choose the safer option and involve a professional.
      </p>
      <div className="grid-2">
        <div className="card static-card urgent">
          <h2 className="brand-font static-h2">Get emergency help now</h2>
          <ul className="static-list">
            <li>Trouble breathing, blue lips, or choking</li>
            <li>
              Crushing chest pain, pain radiating to arm/jaw, fainting, or new
              confusion
            </li>
            <li>Signs of stroke: face droop, arm weakness, slurred speech</li>
            <li>Severe bleeding, major trauma, or sudden severe headache</li>
            <li>Overdose, suicidal intent, or threat to self/others</li>
          </ul>
        </div>
        <div className="card static-card">
          <h2 className="brand-font static-h2">Book timely in-person care</h2>
          <ul className="static-list">
            <li>Fever lasting several days or worsening infection signs</li>
            <li>
              New or worsening pain that limits daily life without clear cause
            </li>
            <li>Unexplained weight loss, persistent GI or neurologic changes</li>
            <li>New medication concerns or unexpected side effects</li>
            <li>Pregnancy-related pain, bleeding, or decreased fetal movement</li>
          </ul>
        </div>
      </div>
      <p className="static-foot">
        Apomuden can suggest self-care for mild issues but will always bias
        toward safety.{' '}
        <Link to="/chat">open the mobile app page</Link> remembering this is
        guidance only.
      </p>
    </div>
  )
}
